import { randomUUID } from 'crypto'
import { FarmDTO } from '../dto/farmer/create.dto'
import { StateEnum } from '../enum/state.enum'

export default class Farm {
  public id: string
  public name: string
  public city: string
  public state: StateEnum
  public total_area: number
  public arable_area: number
  public vegetation_area: number
  public farmer_id: string

  constructor(entity: FarmDTO, farmerId: string) {
    this.id = randomUUID()
    this.name = entity.name
    this.city = entity.city
    this.state = entity.state
    this.total_area = entity.total_area
    this.arable_area = entity.arable_area
    this.vegetation_area = entity.vegetation_area
    this.farmer_id = farmerId
  }
}
