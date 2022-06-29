import { User } from '@domain/user.model';
import { UserCRUD } from '@ports/input/userCRUD.port';
import { UserRepository } from '@ports/output/user.repository.port';
import { dependenciesContainer } from '@shared/dependency_injection';

export const user_useCases = (): UserCRUD => {
  const userRepository: UserRepository =
    dependenciesContainer.cradle.userRepository();

  const create = async (name: string): Promise<User | undefined> => {
    return userRepository.create(name);
  };
  const getAll = async (): Promise<User[]> => {
    return userRepository.getAll();
  };
  const getOne = async (id: string): Promise<User | undefined> => {
    return userRepository.getOne(id);
  };
  return { getAll, create, getOne };
};
