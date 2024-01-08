import knex, { Knex } from 'knex'
import { injectable } from 'tsyringe'
import databaseConfig from '../config/database.config'
import Farm from '../model/Farm'

@injectable()
export class FarmRepository {
  private readonly tableName: string = 'farm'

  private readonly db: Knex = knex(databaseConfig)

  async create(newFarm: Farm[]): Promise<Farm | Farm[]> {
    const trx: Knex.Transaction = await this.db.transaction()

    try {
      const farm = await trx(this.tableName).insert(newFarm).returning('*')

      await trx.commit()
      return farm[0]
    } catch (error) {
      await trx.rollback()
    }
  }

  async update(id: string, obj: Partial<Farm>): Promise<boolean> {
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
