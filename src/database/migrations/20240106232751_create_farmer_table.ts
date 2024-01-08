import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('farmer', function (table) {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('document').unique().notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('farmer')
}
