import knex from 'knex';

import { secrets } from '../utils/secrets';

const { postgres } = secrets;

export const pg = knex({
  client: "postgresql",
  connection: {
    database: postgres.databaseName,
    user: postgres.user,
    password: postgres.password,
    port: postgres.port,
  },
});
