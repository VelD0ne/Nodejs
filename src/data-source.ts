import { DataSource } from 'typeorm';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { DB_PORT } = process.env;
const { DB_USER } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_NAME } = process.env;

if (!DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error('Not enough data to initialize data source');
}

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [resolve(__dirname, './entity/*.ts')],
  migrations: [resolve(__dirname, './migration/*.ts')],
  synchronize: true,
});

export default dataSource;
