import { DataSource } from 'typeorm';
import UserModel from './user/user.model';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DATABASE_USERNAME);
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
