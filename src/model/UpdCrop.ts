import { UpdCropDTO } from '../dto/farmer/update.dto'
import { CropTypeEnum } from '../enum/crop-type.enum'

export default class UpdCrop {
  public crop_type?: CropTypeEnum
  public area?: number

  constructor(entity: UpdCropDTO) {
    this.area = entity.area
    this.crop_type = entity.crop_type
  }
}
