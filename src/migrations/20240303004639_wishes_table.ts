import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('wishes', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.string('description');
    table.text('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.timestamp('created_at', { useTz: false }).notNullable()
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('wishes')
}
