import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, IsString, Validate, ValidateNested } from 'class-validator'
import { CropTypeEnum } from '../../enum/crop-type.enum'
import { StateEnum } from '../../enum/state.enum'
import CropAreaValidator from '../../validator/crop-area.validator'
import DocumentValidator from '../../validator/document.validator'
import TotalAreaValidator from '../../validator/total-area.validator'

export class CropDTO {
  @IsEnum(CropTypeEnum)
  @IsNotEmpty()
  crop_type: CropTypeEnum

  @IsNumber()
  @IsNotEmpty()
  area: number
}

export class FarmDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsEnum(StateEnum)
  @IsNotEmpty()
  state: StateEnum

  @IsNumber()
  @IsNotEmpty()
  total_area: number

  @IsNumber()
  @IsNotEmpty()
  @Validate(TotalAreaValidator)
  arable_area: number

  @IsNumber()
  @IsNotEmpty()
  @Validate(TotalAreaValidator)
  vegetation_area: number

  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @Type(() => CropDTO)
  @Validate(CropAreaValidator)
  crops: CropDTO[]
}

export class CreateFarmerDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @Validate(DocumentValidator)
  document: string

  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @Type(() => FarmDTO)
  farms: FarmDTO[]
}
