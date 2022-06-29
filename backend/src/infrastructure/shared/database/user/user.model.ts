import { EntitySchema } from 'typeorm';
import { User } from '@domain/user.model';

const UserModel = new EntitySchema<User>({
  name: 'User',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    name: {
      type: String,
      length: 30,
    },
  },
});

export default UserModel;
