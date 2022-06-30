import { User } from '@domain/user.model';
export interface UserRepository {
  create: (name: string) => Promise<User | undefined>;
  getAll: () => Promise<User[]>;
  getOne: (id: string) => Promise<User | undefined>;
  connect: (idUser1: string, idUser2: string) => Promise<boolean | undefined>;
  // getConnected: (id: string) => Promise<User[]>;
  // getAllConnections: () => Promise<User[]>; //THIS HAS TO BE RECONSIDERED YET
}
