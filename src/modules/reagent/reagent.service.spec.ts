import { Test, TestingModule } from '@nestjs/testing';
import { ReagentService } from './reagent.service';
import { REAGENT_REPOSITORY_TOKEN } from './reagent.repository';
import { Category, Package } from '@prisma/client';

describe('Reagent Service', () => {
  let reagentService: ReagentService;

  const reagentList = {
    reagents: [
      {
        id: 1,
        name: 'Reagent Unit Test',
        casNumber: '12-45-6',
        producer: 'Producer Unit Test',
        catalogId: 'CATALOG001',
        catalogLink: 'https://e-shop.com/catalog',
        pricePerUnit: 400,
        quantityUnit: 'ml',
        totalQuantity: 30,
        description: 'Reagent for unit test',
        quantityLeft: 30,
        expirationDate: new Date(),
        storageId: 2,
        structure: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1',
        package: Package.Bottle,
        category: Category.Reagent,
        isDeleted: false,
      },
      {
        id: 2,
        name: 'Reagent Unit Test 2',
        casNumber: '12-45-6',
        producer: 'Producer for Unit Test',
        catalogId: 'CATALOG003',
        catalogLink: 'https://e-shop.com/catalog',
        pricePerUnit: 700,
        quantityUnit: 'ml',
        totalQuantity: 80,
        description: 'Reagent for unit test',
        quantityLeft: 65,
        expirationDate: new Date(),
        storageId: 1,
        structure: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1',
        package: Package.Bottle,
        category: Category.Reagent,
        isDeleted: false,
      },
      {
        id: 3,
        name: 'Sample Unit Test',
        casNumber: '78-90-5',
        quantityUnit: 'ml',
        totalQuantity: 50,
        description: 'Sample for unit test',
        quantityLeft: 40,
        expirationDate: new Date(),
        storageId: 2,
        structure: 'c1cccnc1',
        package: Package.Bottle,
        category: Category.Sample,
        isDeleted: false,
      },
    ],
    size: 3,
  };

  const mockReagentRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReagentService, { provide: REAGENT_REPOSITORY_TOKEN, useValue: mockReagentRepository }],
    }).compile();
    reagentService = module.get<ReagentService>(ReagentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('CREATE Reagent Method', () => {
    it('should create reagent with correct data', async () => {
      const reagentData = {
        name: 'Reagent Unit Test',
        casNumber: '12-45-6',
        producer: 'Producer Unit Test',
        catalogId: 'CATALOG001',
        catalogLink: 'https://e-shop.com/catalog',
        pricePerUnit: 400,
        quantityUnit: 'ml',
        totalQuantity: 30,
        description: 'Reagent for unit test',
        quantityLeft: 30,
        expirationDate: new Date(),
        storageId: 2,
        structure: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1',
        package: Package.Bottle,
        category: Category.Reagent,
      };

      mockReagentRepository.create.mockResolvedValue(reagentList.reagents[0]);

      const result = await reagentService.create(reagentData);
      expect(mockReagentRepository.create).toHaveBeenCalledWith(reagentData);
      expect(result).toEqual(reagentList.reagents[0]);
    });
  });

  describe('GET Reagents Method', () => {
    it('should return list of reagents without options', async () => {
      const options = { filter: {}, pagination: { skip: 0, take: 10 }, sort: {}, flag: {} };
      mockReagentRepository.findAll.mockResolvedValue(reagentList);
      const result = await reagentService.getReagents(options);

      expect(mockReagentRepository.findAll).toHaveBeenCalledWith(options.filter, options.pagination, options.sort, options.flag);
      expect(result).toEqual(reagentList);
    });
  });

  describe('GET Reagent by ID Method', () => {
    it('should return correct reagent by ID', async () => {
      mockReagentRepository.findById.mockResolvedValue(reagentList.reagents[0]);

      const result = await reagentService.getReagentById(1);
      expect(mockReagentRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(reagentList.reagents[0]);
    });

    it('should return null when reagent not found by ID', async () => {
      mockReagentRepository.findById.mockResolvedValue(null);

      const result = await reagentService.getReagentById(4);

      expect(mockReagentRepository.findById).toHaveBeenCalledWith(4);
      expect(result).toBeNull();
    });
  });

  describe('EDIT Reagent by ID Method', () => {
    it('should update a reagent and return the updated reagent', async () => {
      const updateDto = { quantityLeft: 20, storageId: 1 };
      const updatedReagent = {
        id: 5,
        casNumber: '12-45-6',
        producer: 'Producer Unit Test',
        catalogId: 'CATALOG001',
        catalogLink: 'https://e-shop.com/catalog',
        pricePerUnit: 400,
        quantityUnit: 'ml',
        totalQuantity: 30,
        description: 'Reagent for unit test',
        quantityLeft: 20,
        expirationDate: new Date(),
        storageId: 1,
        structure: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1',
        package: Package.Bottle,
        category: Category.Reagent,
      };
      mockReagentRepository.updateById.mockResolvedValue(updatedReagent);
      const result = await reagentService.editReagent(updateDto, 5);

      expect(mockReagentRepository.updateById).toHaveBeenCalledWith(updateDto, 5, false);
      expect(result).toEqual(updatedReagent);
    });

    it('should be marked as deleted if quantityLeft is 0', async () => {
      const updateDto = { quantityLeft: 0, storageId: 1 };
      const updatedReagent = {
        id: 5,
        casNumber: '12-45-6',
        producer: 'Producer Unit Test',
        catalogId: 'CATALOG001',
        catalogLink: 'https://e-shop.com/catalog',
        pricePerUnit: 400,
        quantityUnit: 'ml',
        totalQuantity: 30,
        description: 'Reagent for unit test',
        quantityLeft: 0,
        expirationDate: new Date(),
        storageId: 1,
        structure: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1',
        package: Package.Bottle,
        category: Category.Reagent,
        isDeleted: true,
      };

      mockReagentRepository.updateById.mockResolvedValue(updatedReagent);
      const result = await reagentService.editReagent(updateDto, 5);

      expect(mockReagentRepository.updateById).toHaveBeenCalledWith(updateDto, 5, true);
      expect(result).toEqual(updatedReagent);
    });
  });

  describe('DELETE Reagent By ID', () => {
    it('should delete reagent by id', async () => {
      const deletedReagent = {
        id: 5,
        casNumber: '12-45-6',
        producer: 'Producer Unit Test',
        catalogId: 'CATALOG001',
        catalogLink: 'https://e-shop.com/catalog',
        pricePerUnit: 400,
        quantityUnit: 'ml',
        totalQuantity: 30,
        description: 'Reagent for unit test',
        quantityLeft: 0,
        expirationDate: new Date(),
        storageId: 1,
        structure: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1',
        package: Package.Bottle,
        category: Category.Reagent,
        isDeleted: true,
      };
      mockReagentRepository.delete.mockResolvedValue(deletedReagent);
      const result = await reagentService.deleteReagentById(5);

      expect(mockReagentRepository.delete).toHaveBeenCalledWith(5);
      expect(result).toEqual(deletedReagent);
    });
  });
});
