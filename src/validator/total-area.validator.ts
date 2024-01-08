import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'TotalAreaValidator', async: false })
export default class TotalAreaValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { object } = args
    return object['total_area'] >= object['arable_area'] + object['vegetation_area']
  }

  defaultMessage(args: ValidationArguments): string {
    const { object } = args
    return `The sum of arable_area and vegetation_area cannot exceed total_area (${object['total_area']})`
  }
}
