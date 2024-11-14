// import { Test, TestingModule } from '@nestjs/testing';
// import { OrderService } from './order.service';
// import { ORDER_REPOSITORY_TOKEN } from './order.repository';
// import { Logger, NotFoundException, BadRequestException } from '@nestjs/common';
// import { Status } from '@prisma/client';
// import { UpdateOrderDto } from './dto/updateOrder.dto';
// import { CompleteOrderData, OrderWithReagents, OrderList } from './types/order.type';
// import { OrderOptions } from './types/orderOptions.type';
// import { IOrderRepository } from './interfaces/orderRepository.interface';
// import { IOrderService } from './interfaces/orderService.interface';

// describe('OrderService', () => {
//   let service: IOrderService;
//   let repository: IOrderRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         OrderService,
//         {
//           provide: ORDER_REPOSITORY_TOKEN,
//           useValue: {
//             create: jest.fn(),
//             findAll: jest.fn(),
//             findById: jest.fn(),
//             update: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<OrderService>(OrderService);
//     repository = module.get(ORDER_REPOSITORY_TOKEN);
//   });
// });
