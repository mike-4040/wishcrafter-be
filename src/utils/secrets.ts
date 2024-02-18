const { env } = process;

export const secrets = {
  app: {
    port: parseInt(env.PORT || "0"),
  },
  postgres: {
    databaseName: env.POSTGRES_DB,
    password: env.POSTGRES_PASSWORD,
    port: parseInt(env.POSTGRES_PORT || "0"),
    user: env.POSTGRES_USER,
  }
} as const;
