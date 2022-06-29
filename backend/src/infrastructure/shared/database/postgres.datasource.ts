import { DataSource } from 'typeorm';
import UserModel from './user/user.model';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserModel],
  synchronize: true,
  logging: false,
});
