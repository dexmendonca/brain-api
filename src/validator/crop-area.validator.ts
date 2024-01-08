import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'CropAreaValidator', async: false })
export default class CropAreaValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const farm = args.object
    const totalCropArea = value.reduce((acc, crop) => acc + crop.area, 0)

    return totalCropArea <= farm['arable_area']
  }

  defaultMessage(args: ValidationArguments): string {
    const { object } = args
    return `The sum of crop area cannot exceed arable_area of the farm (${object['arable_area']})`
  }
}
