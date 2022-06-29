import { User } from '@domain/user.model';
export interface UserRepository {
  create: (name: string) => Promise<User | undefined>;
  getAll: () => Promise<User[]>;
  // getOne: (id: string) => Promise<User | undefined>;
  // connect: (idUser: string, idConnectedUser: string) => Promise<boolean>;
  // getConnected: (id: string) => Promise<User[]>;
  // getAllConnections: () => Promise<User[]>; //THIS HAS TO BE RECONSIDERED YET
}
