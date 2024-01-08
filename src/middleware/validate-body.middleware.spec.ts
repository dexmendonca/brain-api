import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { CropTypeEnum } from '../enum/crop-type.enum';
import { StateEnum } from '../enum/state.enum';
import { ValidateBodyMiddleware } from './validate-body.middleware';

jest.mock('class-transformer');
jest.mock('class-validator');

const mockDto = {
	name: 'John Doe',
	document: '123456789',
	farms: [
	  {
		name: 'Farm 1',
		city: 'City 1',
		state: StateEnum.RJ,
		total_area: 1000,
		arable_area: 800,
		vegetation_area: 200,
		crops: [
		  {
			crop_type: CropTypeEnum.COFFEE,
			area: 500,
		  },
		  {
			crop_type: CropTypeEnum.CORN,
			area: 300,
		  },
		],
	  },
	],
  };
describe('ValidateBodyMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: mockDto,
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
  });

  it('should validate the request body successfully', async () => {
    (plainToInstance as jest.Mock).mockReturnValue(mockDto);
    (validate as jest.Mock).mockResolvedValue([]);

    await ValidateBodyMiddleware(mockDto)(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle validation errors in the request body', async () => {
    const validationErrors = [{ /* Mock dos erros de validação */ }];
    (plainToInstance as jest.Mock).mockReturnValue(mockDto);
    (validate as jest.Mock).mockResolvedValue(validationErrors);

    await ValidateBodyMiddleware(mockDto)(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorMessage: validationErrors });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle internal server error', async () => {
    (plainToInstance as jest.Mock).mockImplementation(() => {
      throw new Error('Internal server error');
    });

    await ValidateBodyMiddleware(mockDto)(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
  });

});