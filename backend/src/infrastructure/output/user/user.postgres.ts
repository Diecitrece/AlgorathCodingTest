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
  return { getAll, create, getOne };
};
