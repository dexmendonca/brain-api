import knex, { Knex } from 'knex'
import { injectable } from 'tsyringe'
import databaseConfig from '../config/database.config'
import Crop from '../model/Crop'

@injectable()
export class CropRepository {
  private readonly tableName: string = 'crop'

  private readonly db: Knex = knex(databaseConfig)

  async create(newCrop: Crop[]): Promise<Crop | Crop[]> {
    const trx: Knex.Transaction = await this.db.transaction()

    try {
      const crop = await trx(this.tableName).insert(newCrop).returning('*')

      await trx.commit()
      return crop
    } catch (error) {
      console.error(error)
      await trx.rollback()
    }
  }

  async remove(id: string): Promise<boolean> {
    const trx: Knex.Transaction = await this.db.transaction()

    try {
      await trx(this.tableName).where({ id }).del()

      await trx.commit()
      return true
    } catch (error) {
      return false
    }
  }

  async update(id: string, obj: Partial<Crop>): Promise<boolean> {
    const trx: Knex.Transaction = await this.db.transaction()

    try {
      await trx(this.tableName).where({ id }).update(obj)

      await trx.commit()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
