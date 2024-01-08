import knex, { Knex } from 'knex'
import { injectable } from 'tsyringe'
import databaseConfig from '../config/database.config'
import Farmer from '../model/Farmer'

@injectable()
export class FarmerRepository {
  private readonly tableName: string = 'farmer'

  private readonly db: Knex = knex(databaseConfig)

  async create(newFarmer: Farmer): Promise<Farmer> {
    const trx: Knex.Transaction = await this.db.transaction()

    try {
      const farmer = await trx(this.tableName).insert(newFarmer).returning('*')

      await trx.commit()
      return farmer[0]
    } catch (error) {
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

  async findById(id: string): Promise<boolean> {
    const trx: Knex.Transaction = await this.db.transaction()

    try {
      const foundFarmer = await trx(this.tableName).where({ id })

      await trx.commit()
      return foundFarmer[0]
    } catch (error) {
      return false
    }
  }
  async update(id: string, obj: Partial<Farmer>): Promise<boolean> {
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
