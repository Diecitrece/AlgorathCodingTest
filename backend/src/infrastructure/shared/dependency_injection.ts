import { createContainer, asValue } from 'awilix';
import { user_useCases } from 'core/application/use_cases/user.useCases';
import { userRepositoryPostgres } from 'infrastructure/output/user/user.postgres';

export const dependenciesContainer = createContainer();

dependenciesContainer.register({
  userRepository: asValue(userRepositoryPostgres),
  user_useCases: asValue(user_useCases),
});
