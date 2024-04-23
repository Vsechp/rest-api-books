import { getConnection, Connection } from 'typeorm';

export const dataSource: Promise<Connection> = getConnection().connect();