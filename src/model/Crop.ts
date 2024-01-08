import { randomUUID } from 'crypto'
import { CropDTO } from '../dto/farmer/create.dto'
import { CropTypeEnum } from '../enum/crop-type.enum'

export default class Crop {
  public id: string
  public crop_type: CropTypeEnum
  public area: number
  public farm_id: string

  constructor(entity: CropDTO, farmId: string) {
    this.id = randomUUID()
    this.area = entity.area
    this.crop_type = entity.crop_type
    this.farm_id = farmId
  }
}
