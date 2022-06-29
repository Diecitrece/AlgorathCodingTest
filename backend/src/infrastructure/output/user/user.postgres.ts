import { User } from '@domain/user.model';
import postgresDatasource from '@shared/database/postgres.datasource';
import UserModel from '@shared/database/user/user.model';
import { UserRepository } from '@ports/output/user.repository.port';

export const userRepositoryPostgres = (): UserRepository => {
  const getAll = async (): Promise<User[]> => {
    const users: User[] = await postgresDatasource.manager.find(UserModel);
    return users;
  };
  return { getAll };
};
