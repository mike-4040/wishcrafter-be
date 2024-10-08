import type { Knex } from 'knex';

import { secrets } from './utils/secrets.js';

const { postgres } = secrets;

export default {
  development: {
    client: 'postgresql',
    connection: {
      database: postgres.databaseName,
      user: postgres.user,
      password: postgres.password,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: postgres.databaseName,
      user: postgres.user,
      password: postgres.password,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: postgres.databaseName,
      user: postgres.user,
      password: postgres.password,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
} satisfies { [key: string]: Knex.Config };
