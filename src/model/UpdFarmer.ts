import { UpdateFarmerDto } from '../dto/farmer/update.dto'

export default class UpdFarmer {
  public name?: string
  public document?: string

  constructor(entity: UpdateFarmerDto) {
    this.name = entity.name
    this.document = entity.document
  }
}
