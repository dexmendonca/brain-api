import { Router } from 'express'
import FarmerRouter from './farmer.router'
const MainRouter = Router()

MainRouter.use('/farmer', FarmerRouter)

export default MainRouter
