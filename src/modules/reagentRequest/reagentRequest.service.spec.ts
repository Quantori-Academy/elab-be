import { Test, TestingModule } from '@nestjs/testing';
import { ReagentRequestService } from './reagentRequest.service';
import { REQUEST_REPOSITORY_TOKEN } from './reagentRequest.repository';
import { Package } from '@prisma/client';

describe('Reagent Request Service Unit Test', () => {
  let service: ReagentRequestService;
  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReagentRequestService,
        {
          provide: REQUEST_REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<ReagentRequestService>(ReagentRequestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create Reagent Request', async () => {
    const request = {
      name: 'Reagent Request for Unit Test',
      userId: 1,
      desiredQuantity: 300,
      quantityUnit: 'ml',
      userComments: 'request for unit test',
      package: Package.Bottle,
    };
    mockRepository.create.mockReturnValue(request);
    const result = await service.create(request);

    expect(mockRepository.create).toHaveBeenCalledWith(request);
    expect(result).toBe(request);
  });
});
