import knex, { Knex } from 'knex'
import { injectable } from 'tsyringe'
import databaseConfig from '../config/database.config'

@injectable()
export class DashboardRepository {
  private readonly db: Knex = knex(databaseConfig)

  async dashboard(farmerId: string) {
    const trx: Knex.Transaction = await this.db.transaction()

    try {
      const { rows } = await trx.raw('select * from get_farmer_statistics(?)', [farmerId])
      await trx.commit()

      if (rows.length > 0) {
        const dasboard = { ...rows[0] }
        dasboard.area_percentage = {
          arable_area: parseFloat(dasboard.vegetation_area_percentage),
          vegetation_area: parseFloat(dasboard.arable_area_percentage),
        }

        delete dasboard.vegetation_area_percentage
        delete dasboard.arable_area_percentage
        return dasboard
      } else {
        return {}
      }
    } catch (error) {
      console.error(error)
      await trx.rollback()
    }
  }
}
