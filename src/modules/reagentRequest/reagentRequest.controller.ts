import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { REQUEST_SERVICE_TOKEN } from './reagentRequest.service';
import { IReagentRequestService } from './interfaces/reagentRequestService.interface';
import { CreateRequestDto, CreateRequestSuccessDto } from './dto/createRequest.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Entity, Role } from '@prisma/client';
import { GetReagentRequestDto, GetReagentRequestSuccessDto } from './dto/getReagentRequest.dto';
import { ValidateParseQueries } from './pipes/validateParseQueries.pipe';
import { ReagentRequestOptions } from './interfaces/reagentRequestOptions.interface';
import { ParseIdPipe } from 'src/common/pipes/parseId.pipe';
import { UpdateReagentRequestDto, UpdateReagentRequestSuccessDto } from './dto/updateReagentRequest.dto';
import { AuditLogService } from 'src/common/services/auditLog.service';
import { UserPayload } from '../user/interfaces/userEntity.interface';
import { GetReagentRequestHistorySuccessDto } from './dto/getReagentRequestHistory.dto';

const ROUTE = 'reagent_requests';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class ReagentRequestController {
  private logger = new Logger(ReagentRequestController.name);
  constructor(@Inject(REQUEST_SERVICE_TOKEN) private requestService: IReagentRequestService, private auditLogService: AuditLogService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateRequestSuccessDto })
  @Roles(Role.Researcher, Role.ProcurementOfficer)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async create(@Body(new ValidationPipe({ transform: true })) createRequestDto: CreateRequestDto, @Req() req: any) {
    const user: UserPayload = (req as any).user as UserPayload; 
    const dtoWithUserId = {
      ...createRequestDto,
      userId: user.id!,
      amount: 1,
    };
    const reagentRequest =  await this.requestService.create(dtoWithUserId);
    await this.auditLogService.createAuditLog({
      userId: user.id!,
      action: 'CREATE REAGENT REQUEST',
      entity: Entity.ReagentRequest,
      newData: reagentRequest
    });
    return reagentRequest;
  }

  @ApiBearerAuth()
  @ApiQuery({ type: () => GetReagentRequestDto })
  @ApiResponse({ status: HttpStatus.OK, type: GetReagentRequestSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @Roles(Role.ProcurementOfficer, Role.Researcher)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('')
  async getReagentRequests(@Query(ValidateParseQueries) queryDto: ReagentRequestOptions, @Req() req: any) {
    const user = req.user;
    if (user.role === Role.ProcurementOfficer) {
      return await this.requestService.getReagentRequestsForProcurementOficcer(queryDto);
    }
    return await this.requestService.getReagentRequestsForResearchers(queryDto, user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: UpdateReagentRequestSuccessDto })
  @Roles(Role.ProcurementOfficer)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async editReagentRequest(
    @Param('id', ParseIdPipe) id: number,
    @Req() req: any,
    @Body(new ValidationPipe({ transform: true })) updateReagentRequestDto: UpdateReagentRequestDto,
  ) {
    try {
      const request = await this.requestService.getRequestById(id);
      if (!request) throw new NotFoundException('Reagent Request with this ID - NOT FOUND');
      const user: UserPayload = (req as any).user as UserPayload; 
      const updatedRequest =  await this.requestService.editReagentRequest(updateReagentRequestDto, id);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: 'UPDATE REAGENT REQUEST',
        entity: Entity.ReagentRequest,
        oldData: request,
        newData: updatedRequest
      });
      return updatedRequest; 
    } catch (error) {
      this.logger.error('Error in controller path POST /:id ', error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: GetReagentRequestSuccessDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @Roles(Role.ProcurementOfficer, Role.Researcher)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async getReagentRequestById(@Param('id', ParseIdPipe) id: number, @Req() req: any) {
    const user = req.user;
    const request = await this.requestService.getRequestById(id);
    if (!request) throw new NotFoundException('Reagent Request with this ID - NOT FOUND');
    if (user.role === Role.ProcurementOfficer || user.id === request.userId) {
      return request;
    }
    throw new ForbiddenException('Access to this Reagent Request is denied');
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: GetReagentRequestHistorySuccessDto })
  @Roles(Role.ProcurementOfficer, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/history')
  async getReagentRequestHistory() {
    try {
      const history = await this.auditLogService.getHistory(Entity.ReagentRequest);
      return history;
    } catch (error) {
      this.logger.error(`[${this.getReagentRequestHistory.name}] - Exception thrown: ` + error);
      throw error; 
    }
  }
}
