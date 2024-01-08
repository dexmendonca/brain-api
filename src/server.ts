import express, { Request, Response } from 'express'
import helmet from 'helmet'
import 'reflect-metadata'
import { container } from 'tsyringe'

import MainRouter from './routes/_main.router'

//DI
import { FarmerController } from './controller/farmer.controller'
import { CropRepository } from './repository/crop.repository'
import { DashboardRepository } from './repository/dashboard.repository'
import { FarmRepository } from './repository/farm.repository'
import { FarmerRepository } from './repository/farmer.repository'
import { FarmerService } from './service/system.service'

export default class APIServer {
  private app: express.Application

  constructor() {
    console.log(`🖥️  Starting server`)
    this.app = express()
    this.config()
    this.setupDependencies()
    this.routes()
  }

  private config(): void {
    console.log(`🖥️  Registering config`)
    this.app.use(express.json())
    this.app.use(helmet())
  }

  private routes(): void {
    console.log(`🖥️  Registering routes`)
    this.app.use(MainRouter)
    this.app.use((req: Request, res: Response) => {
      res.status(404).send({ msg: 'Route not found' })
    })
  }

  private setupDependencies(): void {
    console.log(`🖥️  Registering dependencies`)

    container.register<DashboardRepository>(DashboardRepository, { useClass: DashboardRepository })
    container.register<FarmRepository>(FarmRepository, { useClass: FarmRepository })
    container.register<FarmRepository>(FarmRepository, { useClass: FarmRepository })
    container.register<FarmerRepository>(FarmerRepository, { useClass: FarmerRepository })
    container.register<CropRepository>(CropRepository, { useClass: CropRepository })
    container.register<FarmerService>(FarmerService, { useClass: FarmerService })
    container.register<FarmerController>(FarmerController, { useClass: FarmerController })
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      const endMsg = `🖥️  Server is running on port ${port}`
      console.log(Array(endMsg.length).fill('=').join(''))
      console.log()
      console.log(endMsg)
    })
  }
}
