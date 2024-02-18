import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', function (table) {
      table.text('id').primary();
      table.text('first_name').notNullable();
      table.text('email').notNullable().index();
      table.boolean('auth_created');
      table.timestamp('created_at', { useTz: false }).notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
