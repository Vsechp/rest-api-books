import { createConnection } from 'typeorm';
import connectionOptions from './config/typeorm';

async function runMigrations() {
  const connection = await createConnection(connectionOptions);
  await connection.runMigrations();
}

if (require.main === module) {
  runMigrations();
}