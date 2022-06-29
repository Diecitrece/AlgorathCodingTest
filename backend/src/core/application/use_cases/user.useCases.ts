import { User } from '@domain/user.model';
import { UserCRUD } from '@ports/input/userCRUD.port';
import { UserRepository } from '@ports/output/user.repository.port';
import { dependenciesContainer } from '@shared/dependency_injection';

export const user_useCases = (): UserCRUD => {
  const userRepository: UserRepository =
    dependenciesContainer.cradle.userRepository();

  const getAll = async (): Promise<User[]> => {
    return userRepository.getAll();
  };
  return { getAll };
};
