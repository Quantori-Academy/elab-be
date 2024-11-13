import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReagentRepository } from './reagent.repository';
import { Category, Package } from '@prisma/client';
import { FlagOptions, Order, PaginationOptions, SortOptions } from './interfaces/reagentOptions.interface';

describe('Reagent Repository Integration Test', () => {
  let reagentRepository: ReagentRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReagentRepository, PrismaService],
    }).compile();

    reagentRepository = module.get<ReagentRepository>(ReagentRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.reagent.createMany({
      data: [
        {
          name: 'Reagent Integration Test 1',
          casNumber: '12-45-6',
          producer: 'Producer Integration Test',
          catalogId: 'CATALOG001',
          catalogLink: 'https://e-shop.com/catalog',
          pricePerUnit: 400,
          quantityUnit: 'ml',
          totalQuantity: 30,
          description: 'Reagent for integration test',
          quantityLeft: 30,
          expirationDate: new Date(),
          storageId: 1,
          structure: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1',
          package: Package.Bottle,
          category: Category.Reagent,
        },
        {
          name: 'Reagent Integration Test 2',
          casNumber: '12-45-6',
          producer: 'Producer Integration Test',
          catalogId: 'CATALOG001',
          catalogLink: 'https://e-shop.com/catalog',
          pricePerUnit: 900,
          quantityUnit: 'ml',
          totalQuantity: 90,
          description: 'Reagent for integration test',
          quantityLeft: 60,
          expirationDate: new Date(),
          storageId: 2,
          structure: 'c1cccnc1',
          package: Package.SolventsBox,
          category: Category.Reagent,
        },
        {
          name: 'Sample Integration Test 1',
          quantityUnit: 'ml',
          totalQuantity: 65,
          description: 'Sample for integration test',
          quantityLeft: 60,
          expirationDate: new Date(),
          storageId: 3,
          structure: 'Cc1nc',
          package: Package.SolventsBox,
          category: Category.Sample,
        },
        {
          name: 'Reagent Integration Test 3',
          casNumber: '12-45-6',
          producer: 'Producer Integration Test',
          catalogId: 'CATALOG001',
          catalogLink: 'https://e-shop.com/catalog',
          pricePerUnit: 470,
          quantityUnit: 'ml',
          totalQuantity: 70,
          description: 'Reagent for integration test',
          quantityLeft: 37,
          expirationDate: new Date(),
          storageId: 1,
          structure: 'Cc1nc(C)c(C(=O)N/N=C/c2cccnc2)cc1C(=O)N/N=C/c1cccnc1',
          package: Package.Bottle,
          category: Category.Reagent,
        },
        {
          name: 'Sample Integration Test 2',
          quantityUnit: 'ml',
          totalQuantity: 70,
          description: 'Reagent for integration test',
          quantityLeft: 70,
          expirationDate: new Date(),
          storageId: 2,
          structure: 'c1cccnc1',
          package: Package.PackageBox,
          category: Category.Sample,
        },
      ],
    });
  });

  afterEach(async () => {
    await prisma.reagent.deleteMany({
      where: {
        name: {
          in: [
            'Reagent Integration Test 1',
            'Reagent Integration Test 2',
            'Reagent Integration Test 3',
            'Sample Integration Test 1',
            'Sample Integration Test 2',
          ],
        },
      },
    });
  });

  describe('findAll(options?)Method', () => {
    it('should return all reagents, if options were not provided', async () => {
      const result = await reagentRepository.findAll();
      expect(result.size).toBeDefined();
      expect(Number(result.size)).toBeGreaterThan(0);
      expect(result.reagents).toBeDefined();
      expect(result.reagents.length).toBeGreaterThan(0);
    });

    it('should return reagents that match-> filter: name, structure, category, storageId', async () => {
      const filter = {
        name: 're',
        structure: 'c1cccnc1',
        category: Category.Reagent,
        storageId: 2,
      };
      const result = await reagentRepository.findAll(filter);
      expect(result).toBeDefined();
      expect(result.reagents).toBeDefined();
      expect(result.reagents.length).toBeGreaterThan(0);

      result.reagents.forEach((reagent) => {
        expect(reagent.category).toBe(Category.Reagent);
        expect(reagent.structure).toContain(filter.structure);
        expect(reagent.name.toLowerCase()).toContain(filter.name.toLowerCase());
        expect(reagent.storageId).toEqual(filter.storageId);
      });
    });
  });

  it('should return reagents that match-> filter: name, structure, category, storageId, flag: isFullStructure: true, pagination', async () => {
    const filter = {
      name: 're',
      structure: 'c1cccnc1',
      category: Category.Reagent,
      storageId: 2,
    };
    const flag: FlagOptions = { isFullStructure: true };
    const pagination: PaginationOptions = { skip: 0, take: 10 };
    const result = await reagentRepository.findAll(filter, pagination, {}, flag);
    expect(result).toBeDefined();
    expect(result.reagents).toBeDefined();
    expect(result.reagents.length).toBeGreaterThan(0);

    result.reagents.forEach((reagent) => {
      expect(reagent.category).toBe(Category.Reagent);
      expect(reagent.structure).toBe(filter.structure);
      expect(reagent.name.toLowerCase()).toContain(filter.name.toLowerCase());
      expect(reagent.storageId).toEqual(filter.storageId);
    });
  });

  it('should return reagents that match-> filter: name, structure, category, storageId, flag: isFullStructure: false, pagination', async () => {
    const filter = {
      name: 're',
      structure: 'c1cccnc1',
      category: Category.Reagent,
      storageId: 2,
    };
    const flag: FlagOptions = { isFullStructure: false };
    const pagination: PaginationOptions = { skip: 0, take: 10 };
    const result = await reagentRepository.findAll(filter, pagination, {}, flag);
    expect(result).toBeDefined();
    expect(result.reagents).toBeDefined();
    expect(result.reagents.length).toBeGreaterThan(0);
    result.reagents.forEach((reagent) => {
      expect(reagent.category).toBe(Category.Reagent);
      expect(reagent.structure).not.toBe(filter.structure);
      expect(reagent.name.toLowerCase()).toContain(filter.name.toLowerCase());
      expect(reagent.storageId).toEqual(filter.storageId);
    });
  });

  it('should return reagents that match-> pagination, sort: name:asc', async () => {
    const pagination: PaginationOptions = { skip: 0, take: 10 };
    const sorting: SortOptions = {
      sortByName: Order.ASC,
    };
    const result = await reagentRepository.findAll({}, pagination, sorting);
    expect(result).toBeDefined();
    expect(result.reagents).toBeDefined();
    expect(result.reagents.length).toBeGreaterThan(0);
    const reagentNames = result.reagents.map((reagent) => reagent.name);
    const sorted = [...reagentNames].sort();
    expect(reagentNames).toEqual(sorted);
  });

  it('should return reagents that match-> pagination, sort: name:desc', async () => {
    const pagination: PaginationOptions = { skip: 0, take: 10 };
    const sorting: SortOptions = {
      sortByName: Order.DESC,
    };
    const result = await reagentRepository.findAll({}, pagination, sorting);
    expect(result).toBeDefined();
    expect(result.reagents).toBeDefined();
    expect(result.reagents.length).toBeGreaterThan(0);
    const reagentNames = result.reagents.map((reagent) => reagent.name);
    const sorted = [...reagentNames].sort((a, b) => b.localeCompare(a));
    expect(reagentNames).toEqual(sorted);
  });
});
