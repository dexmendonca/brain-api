import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  const farmerId = '6c29db55-30fa-446b-8804-0cce32b1bc2b'
  const farmId = 'af00cba5-e7ab-4582-90f2-628bb1f61c1c'

  const cropId1 = '716e1b8b-b6a8-40d7-8415-83d6ddb60ed3'
  const cropId2 = '8903980a-183d-4d14-8d04-8734c2c31736'

  await knex('crop').del()
  await knex('farm').del()
  await knex('farmer').del()

  await knex('farmer').insert({
    id: farmerId,
    name: 'João da Silva',
    document: '92128196051',
  })

  await knex('farm').insert({
    id: farmId,
    name: 'Fazenda da Madeira',
    city: 'Belém',
    state: 'PA',
    total_area: 100,
    arable_area: 50,
    vegetation_area: 50,
    farmer_id: farmerId,
  })
  await knex('crop').insert([
    {
      id: cropId1,
      crop_type: 'COTTON',
      area: 20,
      farm_id: farmId,
    },
    {
      id: cropId2,
      crop_type: 'SUGARCANE',
      area: 30,
      farm_id: farmId,
    },
  ])
}
