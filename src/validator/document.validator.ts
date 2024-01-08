import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { detectDocument } from '../util/document.util'

@ValidatorConstraint({ name: 'DocumentValidator', async: false })
export default class DocumentValidator implements ValidatorConstraintInterface {
  validate(document: string): boolean {
    if (!document) {
      return false
    }

    const documentType = detectDocument(document)

    return documentType === 'CPF' || documentType == 'CNPJ'
  }

  defaultMessage(): string {
    return 'The document must be a valid CPF or CNPJ'
  }
}
