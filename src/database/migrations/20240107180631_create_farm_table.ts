import type { Knex } from 'knex'
import { StateEnum } from '../../enum/state.enum'

export async function up(knex: Knex): Promise<void> {
  const validStates = Object.values(StateEnum)

  await knex.schema.createTable('farm', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('city').notNullable()
    table.enum('state', validStates).notNullable()
    table.integer('total_area').notNullable()
    table.integer('arable_area').notNullable()
    table.integer('vegetation_area').notNullable()
    table.uuid('farmer_id').notNullable()
    table.foreign('farmer_id').references('id').inTable('farmer').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('farm')
}
