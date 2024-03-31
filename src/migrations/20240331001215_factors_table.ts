import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('factors', (table) => {
    table.uuid('id').primary();
    table.uuid('wish_id').notNullable();
    table.foreign('wish_id').references('id').inTable('wishes');
    table.string('name').notNullable();
    table.string('type').notNullable();
    table.boolean('not_important').notNullable().defaultTo(false);
    table.jsonb('value').notNullable();
    table.bigint('created_at').notNullable();
    table.bigint('updated_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('factors');
}
