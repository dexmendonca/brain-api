import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import 'reflect-metadata'
import { CropTypeEnum } from '../../enum/crop-type.enum'
import { StateEnum } from '../../enum/state.enum'
import { UpdateFarmerDto, UpdCropDTO, UpdFarmDTO } from './update.dto'

describe('UpdateFarmerDto', () => {
  it('should validate UpdateFarmerDto correctly', async () => {
    const dto = plainToInstance(UpdateFarmerDto, {
      name: 'John Doe',
      document: '81739524004',
    })

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should validate nested UpdFarmDTO array in UpdateFarmerDto correctly', async () => {
    const updCrop = plainToInstance(UpdCropDTO, {
      crop_type: CropTypeEnum.CORN,
      area: 100,
    })

    const updFarm = plainToInstance(UpdFarmDTO, {
      name: 'Farm Name',
      city: 'City',
      state: StateEnum.RJ,
      total_area: 500,
      arable_area: 300,
      vegetation_area: 200,
      crops: [updCrop],
    })

    const dto = plainToInstance(UpdateFarmerDto, {
      name: 'John Doe',
      document: '81739524004',
      farms: [updFarm],
    })

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should fail validation if nested UpdFarmDTO array in UpdateFarmerDto has invalid data', async () => {
    const updCrop = plainToInstance(UpdCropDTO, {
      crop_type: CropTypeEnum.COFFEE,
    })

    const updFarm = plainToInstance(UpdFarmDTO, {
      name: 'Farm Name',
      crops: [updCrop], // Missing required fields for UpdCropDTO
    })

    const dto = plainToInstance(UpdateFarmerDto, {
      name: 'John Doe',
      document: '12345678901',
      farms: [updFarm],
    })

    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
  })
})
