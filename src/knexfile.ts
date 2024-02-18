import type { Knex } from "knex";

import { secrets } from "./utils/secrets";

const { postgres } = secrets;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: postgres.databaseName,
      user: postgres.user,
      password: postgres.password,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: postgres.databaseName,
      user: postgres.user,
      password: postgres.password,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: postgres.databaseName,
      user: postgres.user,
      password: postgres.password,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
