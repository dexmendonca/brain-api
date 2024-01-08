import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
  ValidateNested,
} from 'class-validator'
import { CropTypeEnum } from '../../enum/crop-type.enum'
import { StateEnum } from '../../enum/state.enum'
import CropAreaValidator from '../../validator/crop-area.validator'
import DocumentValidator from '../../validator/document.validator'
import TotalAreaValidator from '../../validator/total-area.validator'

export class UpdCropDTO {
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  id?: string

  @IsEnum(CropTypeEnum)
  @IsNotEmpty()
  @IsOptional()
  crop_type?: CropTypeEnum

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  area?: number
}

export class UpdFarmDTO {
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  id?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  city?: string

  @IsEnum(StateEnum)
  @IsOptional()
  @IsNotEmpty()
  state?: StateEnum

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  total_area?: number

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Validate(TotalAreaValidator)
  arable_area?: number

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Validate(TotalAreaValidator)
  vegetation_area?: number

  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @Type(() => UpdCropDTO)
  @IsOptional()
  @Validate(CropAreaValidator)
  crops?: UpdCropDTO[]
}

export class UpdateFarmerDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Validate(DocumentValidator)
  document?: string

  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @Type(() => UpdFarmDTO)
  @IsOptional()
  farms?: UpdFarmDTO[]
}
