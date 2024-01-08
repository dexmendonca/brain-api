import 'reflect-metadata'

import { CropTypeEnum } from '../enum/crop-type.enum'
import { StateEnum } from '../enum/state.enum'
import { CropRepository } from '../repository/crop.repository'
import { DashboardRepository } from '../repository/dashboard.repository'
import { FarmRepository } from '../repository/farm.repository'
import { FarmerRepository } from '../repository/farmer.repository'
import { FarmerService } from './system.service'

jest.mock('../repository/farmer.repository')
jest.mock('../repository/farm.repository')
jest.mock('../repository/crop.repository')
jest.mock('../repository/dashboard.repository')

const farmerData = {
  name: 'John Doe',
  document: '1111111111',
  farms: [
    {
      name: 'Farm A',
      city: 'Rio',
      state: StateEnum.RJ,
      total_area: 90,
      arable_area: 40,
      vegetation_area: 50,
      crops: [{ crop_type: CropTypeEnum.COFFEE, area: 10 }],
    },
  ],
}

describe('FarmerService', () => {
  let farmerService: FarmerService
  let farmerRepository: jest.Mocked<FarmerRepository>
  let farmRepository: jest.Mocked<FarmRepository>
  let cropRepository: jest.Mocked<CropRepository>
  let dashboardRepository: jest.Mocked<DashboardRepository>

  beforeEach(() => {
    farmerRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<FarmerRepository>

    farmRepository = {
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<FarmRepository>

    cropRepository = {
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<CropRepository>

	dashboardRepository= {
      dasboard: jest.fn(),
    } as unknown as jest.Mocked<DashboardRepository>

    farmerService = new FarmerService(farmerRepository, farmRepository, cropRepository,dashboardRepository)
  })

  describe('createFarmer', () => {
    it('should create a valid farmer creation', async () => {
      farmerRepository.create.mockResolvedValue({ id: '1111', name: farmerData.name, document: farmerData.document })

      const result = await farmerService.createFarmer(farmerData)

      expect(result).toEqual({
        status: 201,
        data: { message: 'Farmer add succesfully' },
      })
    })
    it('should handle errors during farmer creation', async () => {
      farmerRepository.create.mockRejectedValue(new Error('Failed to create farmer'))

      const result = await farmerService.createFarmer(farmerData)

      expect(result).toEqual({
        status: 406,
        data: { errorMessage: 'Failed to add a Farmer' },
      })
    })

    describe('deleteFarmer', () => {
      it('should handle farmer not found during deletion', async () => {
        const farmerId = 'f214f4c6-721b-40e0-9664-e02e6e1b7ba7'
        jest.spyOn(farmerRepository, 'remove').mockResolvedValue(false)

        const result = await farmerService.deleteFarmer(farmerId)

        expect(result).toEqual({
          status: 404,
          data: { message: 'Farmer not found' },
        })
      })
    })

  })
})
