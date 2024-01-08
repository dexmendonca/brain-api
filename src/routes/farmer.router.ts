import { Router } from 'express'
import { container } from 'tsyringe'
import { FarmerController } from '../controller/farmer.controller'
import { CreateFarmerDto } from '../dto/farmer/create.dto'
import { UpdateFarmerDto } from '../dto/farmer/update.dto'
import { ValidateBodyMiddleware } from '../middleware/validate-body.middleware'

const FarmerRouter = Router()
const farmerController = container.resolve(FarmerController)

FarmerRouter.post('/', ValidateBodyMiddleware(CreateFarmerDto), farmerController.createFarmer)
FarmerRouter.put('/:id', ValidateBodyMiddleware(UpdateFarmerDto), farmerController.updateFarmer)
FarmerRouter.delete('/:id', farmerController.deleteFarmer)
FarmerRouter.get('/:id/dashboard', farmerController.dashboard)

export default FarmerRouter
