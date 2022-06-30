import { ConnectedUser, User } from '@domain/user.model';
import { UserCRUD } from '@ports/input/userCRUD.port';
import { UserRepository } from '@ports/output/user.repository.port';
import { dependenciesContainer } from '@shared/dependency_injection';
import { BooleanLiteral } from 'typescript';

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
  const connect = async (
    idUser1: string,
    idUser2: string
  ): Promise<boolean | undefined> => {
    return userRepository.connect(idUser1, idUser2);
  };
  const getConnected = async (id: string): Promise<User[] | undefined> => {
    return userRepository.getConnected(id);
  };
  const getAllConnections = async (): Promise<ConnectedUser[]> => {
    return userRepository.getAllConnections();
  };
  return { getAll, create, getOne, connect, getConnected, getAllConnections };
};
