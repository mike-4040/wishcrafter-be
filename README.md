# Wish Crafter Backend

## Prerequisites

1. None version manager - nvm
2. Docker

## Development

1. Copy the `.env.example` file to `.env` and fill in the required environment variables.

2. Start the database

```bash
docker-compose up -d
```

3. Running migrations

```bash
# We use knex cli to run migrations. Special configuration required to run .ts migrations.

# Invoke the knex cli with the following command
npm run knex -- knex_command --knex_option

# Example
npm run knex -- migrate:latest

# Your best friend
npm run knex -- --help
```

