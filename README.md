# Wish Crafter Backend

## Prerequisites

1. None version manager - nvm
2. Docker

## Development

1. Copy the `.env.example` file to `.env` and fill in the required environment variables.

2. Firebase-tools

We use locally installed firebase tools, it should be invoked with `npx` command.

```bash
npx firebase [command] [options]
```

3. Database

We use docker to run the database.
You can use `docker-compose` to handle the database container.

The preferred way is to use npm scripts.

```bash
npm run db:start

npm run db:stop
```

4. Running migrations

We use knex cli to run migrations.

Special configuration required to run .ts migrations.

Invoke the knex cli with the following commands.

```bash
npm run knex -- [knex_command] [knex_option]

# Example
npm run knex -- migrate:latest

# Your best friend
npm run knex -- --help
```
