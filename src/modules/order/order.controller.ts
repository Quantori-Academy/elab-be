import { Body, Controller, Get, HttpStatus, Inject, Logger, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ORDER_SERVICE_TOKEN } from './order.service';
import { IOrderService } from './interfaces/orderService.interface';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompleteOrderData, OrderList, OrderWithReagents } from './types/order.type';
import {
  CreateOrderBadRequestDto,
  CreateOrderConflictErrorDto,
  CreateOrderDto,
  CreateOrderNotFoundDto,
  CreateOrderSuccessDto,
} from './dto/createOrder.dto';
import { Request } from 'express';
import { UserPayload } from '../user/interfaces/userEntity.interface';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { TokenErrorResponseDto } from '../security/dto/token.dto';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';
import { ValidateParseOrderOptionsPipe } from './pipes/validateParseQueries..pipe';
import { OrdereOptions } from './types/orderOptions.type';
import { GetOrderListResponseDto, GetOrdersQueryDto, GetOrderValidationErrorsDto } from './dto/getOrder.dto';

const ROUTE = 'orders';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class OrderController {
  private readonly logger: Logger = new Logger(OrderController.name);

  constructor(@Inject(ORDER_SERVICE_TOKEN) private orderService: IOrderService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateOrderSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: CreateOrderBadRequestDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: CreateOrderNotFoundDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: CreateOrderConflictErrorDto })
  @Roles(Role.ProcurementOfficer)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async createOrder(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true })) orderDto: CreateOrderDto,
  ): Promise<OrderWithReagents> {
    this.logger.log(`[${this.createOrder.name}] - Method start`);
    try {
      const user: UserPayload = (req as any).user as UserPayload;
      const complteOrderData: CompleteOrderData = {
        userId: user.id!,
        ...orderDto,
      };
      const order: OrderWithReagents = await this.orderService.createOrder(complteOrderData);
      this.logger.log(`[${this.createOrder.name}] - Method finished`);
      return order;
    } catch (error) {
      this.logger.error(`[${this.createOrder.name}] - Exception thrown: ` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiQuery({ type: GetOrdersQueryDto })
  @ApiResponse({ status: HttpStatus.OK, type: GetOrderListResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: GetOrderValidationErrorsDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @Roles(Role.ProcurementOfficer)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('')
  async orderList(@Query(ValidateParseOrderOptionsPipe) options: OrdereOptions): Promise<OrderList> {
    this.logger.log(`[${this.orderList.name}] - Method start`);
    try {
      const order: OrderList = await this.orderService.orderList(options);
      this.logger.log(`[${this.orderList.name}] - Method finished`);
      return order;
    } catch (error) {
      this.logger.error(`[${this.orderList.name}] - Exception thrown: ` + error);
      throw error;
    }
  }
}
