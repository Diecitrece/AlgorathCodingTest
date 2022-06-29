import { app } from './app';
import { initDB } from '@shared/database/initDB';
import postgresDatasource from '@shared/database/postgres.datasource';
const PORT = 8080;

initDB(postgresDatasource);

const server = app.listen(PORT, () => {
  console.log(`App listening on port 80`);
});

module.exports = server;
