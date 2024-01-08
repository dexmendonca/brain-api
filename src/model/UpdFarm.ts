import { UpdFarmDTO } from '../dto/farmer/update.dto'
import { StateEnum } from '../enum/state.enum'

export default class UpdFarm {
  public name?: string
  public city?: string
  public state?: StateEnum
  public total_area?: number
  public arable_area?: number
  public vegetation_area?: number
  public farmer_id?: string

  constructor(entity: UpdFarmDTO, farmerId: string) {
    this.name = entity.name
    this.city = entity.city
    this.state = entity.state
    this.total_area = entity.total_area
    this.arable_area = entity.arable_area
    this.vegetation_area = entity.vegetation_area
    this.farmer_id = farmerId
  }
}
