import { EntitySchema } from 'typeorm';
import { ConnectedUser } from '@domain/user.model';

const UserModel = new EntitySchema<ConnectedUser>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    name: {
      type: String,
      length: 30,
    },
  },
  relations: {
    connections: {
      target: 'users',
      type: 'many-to-many',
      joinTable: true,
      cascade: true,
    },
  },
});

export default UserModel;
