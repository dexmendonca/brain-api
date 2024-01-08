import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { CropTypeEnum } from '../../enum/crop-type.enum';
import { StateEnum } from '../../enum/state.enum';
import { CreateFarmerDto } from './create.dto';

describe('CreateFarmerDto validation', () => {
  test('should pass validation with correct data', async () => {
    const data:CreateFarmerDto = {
      name: 'John Doe',
      document: '12345678901',
      farms: [
        {
          name: 'Farm A',
          city: 'City A',
          state: StateEnum.SP,
          total_area: 100,
          arable_area: 50,
          vegetation_area: 50,
          crops: [
            { crop_type: CropTypeEnum.CORN, area: 30 },
            { crop_type: CropTypeEnum.COTTON, area: 20 },
          ],
        },
      ],
    };

    const dtoInstance = data
    const errors = await validate(dtoInstance);

    expect(errors.length).toBe(0);
  });

  test('should fail validation with incorrect data', async () => {
    const data = {
      name: 'John Doe',
      document: 'invalid-document',
      farms: [
        {
          name: 'Farm B',
          city: 'City B',
          state: 'INVALID_STATE',
          total_area: 100,
          arable_area: 60,
          vegetation_area: 50,
          crops: [{ crop_type: 'CORN', area: 70 }],
        },
      ],
    };

    const dtoInstance = plainToInstance(CreateFarmerDto, data);
    const errors = await validate(dtoInstance);

    expect(errors.length).toBeGreaterThan(0);
  });
});
