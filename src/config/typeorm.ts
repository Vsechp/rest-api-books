import { createConnection, ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migration/**/*{.ts,.js}'],
  synchronize: false,
};

createConnection(connectionOptions)
  .then(() => console.log('Successfully connected to the database'))
  .catch((error) => console.error('Error connecting to the database', error));

export default connectionOptions;