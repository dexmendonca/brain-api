import type { Knex } from 'knex'
import { CropTypeEnum } from '../../enum/crop-type.enum'

export async function up(knex: Knex): Promise<void> {
  const validCropType = Object.values(CropTypeEnum)

  await knex.schema.createTable('crop', (table) => {
    table.uuid('id').primary()
    table.enum('crop_type', validCropType).notNullable()
    table.integer('area').notNullable()
    table.uuid('farm_id').notNullable()
    table.foreign('farm_id').references('id').inTable('farm').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('crop')
}
