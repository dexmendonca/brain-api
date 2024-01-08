import { randomUUID } from 'crypto'
import { CreateFarmerDto } from '../dto/farmer/create.dto'

export default class Farmer {
  public id: string
  public name: string
  public document: string

  constructor(entity: CreateFarmerDto) {
    this.id = randomUUID()
    this.name = entity.name
    this.document = entity.document
  }
}
