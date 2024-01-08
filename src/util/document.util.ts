import { CNPJ, CPF } from '@julioakira/cpf-cnpj-utils'

const formatDoc = (doc: string) => {
  return doc.replace(/[^0-9]/g, '')
}

export const detectDocument = (doc: string) => {
  const formatedDoc = formatDoc(doc)
  if (CNPJ.Validate(formatedDoc)) {
    return 'CNPJ'
  } else if (CPF.Validate(formatedDoc)) {
    return 'CPF'
  } else {
    return null
  }
}
