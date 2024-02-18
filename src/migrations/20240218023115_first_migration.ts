import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id');
      table.text('first_name').notNullable();
      table.text('last_name').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

