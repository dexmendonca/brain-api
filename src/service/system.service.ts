import { injectable } from 'tsyringe'
import { CreateFarmerDto } from '../dto/farmer/create.dto'
import { UpdateFarmerDto } from '../dto/farmer/update.dto'
import Crop from '../model/Crop'
import Farm from '../model/Farm'
import Farmer from '../model/Farmer'
import UpdCrop from '../model/UpdCrop'
import UpdFarm from '../model/UpdFarm'
import UpdFarmer from '../model/UpdFarmer'
import { CropRepository } from '../repository/crop.repository'
import { DashboardRepository } from '../repository/dashboard.repository'
import { FarmRepository } from '../repository/farm.repository'
import { FarmerRepository } from '../repository/farmer.repository'
import IServiceResponse from '../shared/interface/service-response.interface'

@injectable()
export class FarmerService {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly farmRepository: FarmRepository,
    private readonly cropRepository: CropRepository,
    private readonly dashboardRepository: DashboardRepository,
  ) {}
  async createFarmer(createFarmerBody: CreateFarmerDto): Promise<IServiceResponse> {
    try {
      const farmer = new Farmer(createFarmerBody)
      const addedFarmer = await this.farmerRepository.create(farmer)

      const totalFarm = createFarmerBody.farms.length
      if (totalFarm > 0) {
        const farms = createFarmerBody.farms

        const farmArr: Farm[] = []
        const cropArr: Crop[] = []

        for (let i = 0; i < totalFarm; i++) {
          const actualFarm = farms[i]
          const farm = new Farm(actualFarm, addedFarmer.id)
          farmArr.push(farm)

          const totalCrops = farms[i].crops.length
          if (totalCrops > 0) {
            const crops = farms[i].crops
            for (let ci = 0; ci < totalCrops; ci++) {
              const actualCrop = crops[ci]
              const crop = new Crop(actualCrop, farm.id)
              cropArr.push(crop)
            }
          }
        }

        await this.farmRepository.create(farmArr)
        await this.cropRepository.create(cropArr)
      }

      return {
        status: 201,
        data: { message: 'Farmer add succesfully' },
      }
    } catch (error) {
      console.error(error)
      return {
        status: 406,
        data: { errorMessage: 'Failed to add a Farmer' },
      }
    }
  }

  async deleteFarmer(farmerId: string): Promise<IServiceResponse> {
    try {
      const farmer = await this.farmerRepository.findById(farmerId)

      if (!farmer) {
        return {
          status: 404,
          data: { message: 'Farmer not found' },
        }
      }
      const isDeleted = await this.farmerRepository.remove(farmerId)

      if (isDeleted) {
        return {
          status: 200,
          data: { message: 'Farmer removed succesfully' },
        }
      } else {
        return {
          status: 406,
          data: { message: 'Failed to remove a Farmer' },
        }
      }
    } catch (error) {
      return {
        status: 406,
        data: { errorMessage: 'Failed to remove a Farmer' },
      }
    }
  }

  async updateFarmer(farmerId: string, bodyUpdate: Partial<UpdateFarmerDto>): Promise<IServiceResponse> {
    try {
      const farmer = await this.farmerRepository.findById(farmerId)

      if (!farmer) {
        return {
          status: 404,
          data: { message: 'Farmer not found' },
        }
      }

      const farmerToUpdate = new UpdFarmer(bodyUpdate)
      await this.farmerRepository.update(farmerId, farmerToUpdate)

      const farmList = []
      const cropList = []
      if (bodyUpdate.farms) {
        const farms = bodyUpdate.farms
        farms.forEach((farm) => {
          const updFarm = new UpdFarm(farm, farmerId)
          farmList.push(this.farmRepository.update(farm.id, updFarm))
          if (farm.crops) {
            const crops = farm.crops
            crops.forEach((crop) => {
              const updCrop = new UpdCrop(crop)
              cropList.push(this.cropRepository.update(crop.id, updCrop))
            })
          }
        })
      }

      await Promise.all(farmList)
      await Promise.all(cropList)

      return {
        status: 200,
        data: { message: 'Farmer updated succesfully' },
      }
    } catch (error) {
      return {
        status: 406,
        data: { errorMessage: 'Failed to remove a Farmer' },
      }
    }
  }

  async dashboard(farmerId: string) {
    const farmer = await this.farmerRepository.findById(farmerId)

    if (!farmer) {
      return {
        status: 404,
        data: { message: 'Farmer not found' },
      }
    }
    const dashboard = await this.dashboardRepository.dashboard(farmerId)
    try {
      return {
        status: 200,
        data: dashboard,
      }
    } catch (error) {
      return {
        status: 406,
        data: { errorMessage: 'Failed to remove a Farmer' },
      }
    }
  }
}
