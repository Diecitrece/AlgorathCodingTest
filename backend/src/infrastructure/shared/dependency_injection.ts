import { createContainer, asValue } from 'awilix';
import { user_useCases } from '@use_cases/user.useCases';
import { userRepositoryPostgres } from '@output_infrastructure/user/user.postgres';

export const dependenciesContainer = createContainer();

dependenciesContainer.register({
  userRepository: asValue(userRepositoryPostgres),
  user_useCases: asValue(user_useCases),
});
