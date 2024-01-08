import 'dotenv/config'
import { Knex } from 'knex'
import { resolve } from 'node:path'

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'brain',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'brain',
  },
  pool: {
    min: parseInt(process.env.DB_MIN_POOL || '2'),
    max: parseInt(process.env.DB_MAX_POOL || '10'),
  },
  migrations: {
    tableName: 'migrations',
    directory: resolve(__dirname, '../../src/database/migrations'),
  },
  seeds: {
    directory: resolve(__dirname, '../../src/database/seeds'),
  },
}
export default config
