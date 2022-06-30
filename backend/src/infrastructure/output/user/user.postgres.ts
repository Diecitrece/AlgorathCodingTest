import { User } from '@domain/user.model';
import postgresDatasource from '@shared/database/postgres.datasource';
import UserModel from '@shared/database/user/user.model';
import { UserRepository } from '@ports/output/user.repository.port';

export const userRepositoryPostgres = (): UserRepository => {
  const userRepository = postgresDatasource.getRepository(UserModel);
  const create = async (name: string): Promise<User | undefined> => {
    const exists = await userRepository.findOne({ where: { name: name } });
    if (exists) return undefined;
    const user: User = await userRepository.save({ name });
    return user;
  };
  const getAll = async (): Promise<User[]> => {
    const users: User[] = await userRepository.find();
    return users;
  };
  const getOne = async (id: string): Promise<User | undefined> => {
    return (await userRepository.findOne({ where: { id } })) || undefined;
  };
  const connect = async (
    idUser1: string,
    idUser2: string
  ): Promise<boolean | undefined> => {
    const user1 = await userRepository.findOne({ where: { id: idUser1 } });
    const user2 = await userRepository.findOne({ where: { id: idUser2 } });
    if (!user1 || !user2) {
      return undefined;
    }
    const alreadyConnected = await postgresDatasource
      .createQueryBuilder()
      .select('COUNT(*)')
      .from('users_connections_users', 'connection')
      .where('"usersId_1" = :idUser1', { idUser1 })
      .andWhere('"usersId_2" = :idUser2', { idUser2 })
      .orWhere('"usersId_2" = :idUser1', { idUser1 })
      .andWhere('"usersId_1" = :idUser2', { idUser2 })
      .getCount();

    if (alreadyConnected != 0) {
      await postgresDatasource
        .createQueryBuilder()
        .delete()
        .from('users_connections_users')
        .where('"usersId_1" = :idUser1', { idUser1 })
        .andWhere('"usersId_2" = :idUser2', { idUser2 })
        .orWhere('"usersId_2" = :idUser1', { idUser1 })
        .andWhere('"usersId_1" = :idUser2', { idUser2 })
        .execute();
      return false;
    }
    await postgresDatasource
      .createQueryBuilder()
      .insert()
      .into('users_connections_users')
      .values({ usersId_1: idUser1, usersId_2: idUser2 })
      .execute();
    return true;
  };
  const getConnected = async (id: string): Promise<User[] | undefined> => {
    const exists = await userRepository.findOne({ where: { id } });
    if (!exists) {
      return undefined;
    }
    const connections = await postgresDatasource.query(
      `SELECT DISTINCT users.id, users.name from users_connections_users as connections 
      INNER JOIN users ON users.id = connections."usersId_1" OR users.id = connections."usersId_2" 
      WHERE (connections."usersId_1" = '${id}' OR connections."usersId_2" = '${id}') AND users.id != '${id}'`
    );
    return connections;
  };
  return { getAll, create, getOne, connect, getConnected };
};
