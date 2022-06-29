import reflectMetadata from 'reflect-metadata';
import { DataSource } from 'typeorm';

export const initDB = (dataSource: DataSource) => {
  dataSource
    .initialize()
    .then(async () => console.log('Database up and ready!'))
    .catch((error) => console.log(`Database connection error -> ${error}`));
};
