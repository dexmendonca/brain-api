import { Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { FarmerService } from '../service/system.service'

@injectable()
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  public createFarmer = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.farmerService.createFarmer(req.body)

      res.status(response.status).json(response.data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ errorMessage: 'Internal server error' })
    }
  }

  public deleteFarmer = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.farmerService.deleteFarmer(req.params.id)

      res.status(response.status).json(response.data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ errorMessage: 'Internal server error' })
    }
  }

  public updateFarmer = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.farmerService.updateFarmer(req.params.id, req.body)

      res.status(response.status).json(response.data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ errorMessage: 'Internal server error' })
    }
  }

  public dashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.farmerService.dashboard(req.params.id)

      res.status(response.status).json(response.data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ errorMessage: 'Internal server error' })
    }
  }
}
