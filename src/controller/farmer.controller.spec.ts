import { Request, Response } from 'express';
import "reflect-metadata";
import { CropRepository } from '../repository/crop.repository';
import { DashboardRepository } from '../repository/dashboard.repository';
import { FarmRepository } from '../repository/farm.repository';
import { FarmerRepository } from '../repository/farmer.repository';
import { FarmerService } from '../service/system.service';
import { FarmerController } from './farmer.controller';

describe('FarmerController', () => {
  let farmerController: FarmerController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let farmerService: FarmerService;
  let farmerRepositoryMock: jest.Mocked<FarmerRepository>;
  let farmRepositoryMock: jest.Mocked<FarmRepository>;
  let cropRepositoryMock: jest.Mocked<CropRepository>;
  let dashboardRepository: jest.Mocked<DashboardRepository>;

  beforeEach(() => {
	farmerRepositoryMock = {} as jest.Mocked<FarmerRepository>;
    farmRepositoryMock = {} as jest.Mocked<FarmRepository>;
    cropRepositoryMock = {} as jest.Mocked<CropRepository>;
	farmerService = new FarmerService(
		farmerRepositoryMock,
		farmRepositoryMock,
		cropRepositoryMock,
		dashboardRepository
	  );
    farmerController = new FarmerController(farmerService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('createFarmer', () => {
    it('should create a farmer successfully', async () => {
      mockRequest.body = {
		name: 'Anacleto da Silva',
		document: '11122233344456'
	  };

      jest.spyOn(farmerService, 'createFarmer').mockResolvedValue({
        status: 201,
        data: { message: 'Farmer add succesfully' },
      });

      await farmerController.createFarmer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Farmer add succesfully' });
    });

    it('should handle errors when creating a farmer', async () => {

      mockRequest.body = {
		name: 'Nome de teste'
	  }

      jest.spyOn(farmerService, 'createFarmer').mockRejectedValue( {
        status: 406,
        data: { errorMessage: 'Failed to add a Farmer' },
      });

      await farmerController.createFarmer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ errorMessage: 'Internal server error' });
    });
  });

  describe('deleteFarmer', () => {
    it('should delete a farmer successfully', async () => {

      mockRequest.params = { id: 'valid_farmer_id' };

      jest.spyOn(farmerService, 'deleteFarmer').mockResolvedValue({
        status: 200,
        data: { message: 'Farmer removed succesfully' },
      });

      await farmerController.deleteFarmer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Farmer removed succesfully' });
    });

    it('should handle errors when deleting a farmer', async () => {

      mockRequest.params = { id: 'invalid_farmer_id' };
      jest.spyOn(farmerService, 'deleteFarmer').mockRejectedValue(new Error('Failed to remove a Farmer'));

      await farmerController.deleteFarmer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ errorMessage: 'Internal server error' });
    });

  });

  describe('updateFarmer', () => {
    it('should update a farmer successfully', async () => {

      mockRequest.params = { id: 'valid_farmer_id' };
      mockRequest.body = {

      };

      jest.spyOn(farmerService, 'updateFarmer').mockResolvedValue({
        status: 200,
        data: { message: 'Farmer updated succesfully' },
      });

      await farmerController.updateFarmer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Farmer updated succesfully' });
    });

    it('should handle errors when updating a farmer', async () => {

      mockRequest.params = { id: 'invalid_farmer_id' };
      mockRequest.body = {

      };

      jest.spyOn(farmerService, 'updateFarmer').mockRejectedValue(new Error('Failed to update a Farmer'));

      await farmerController.updateFarmer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ errorMessage: 'Internal server error' });
    });

  });
});