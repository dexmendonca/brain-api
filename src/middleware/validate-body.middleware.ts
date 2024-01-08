import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export const ValidateBodyMiddleware = (dto) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentObj = plainToInstance(dto, req.body)
    const errors = await validate(currentObj)

    if (errors.length > 0) {
      return res.status(400).json({ errorMessage: errors })
    }

    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ errorMessage: 'Internal server error' })
  }
}
