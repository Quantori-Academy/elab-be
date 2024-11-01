import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { REQUEST_SERVICE_TOKEN } from './reagentRequest.service';
import { IReagentRequestService } from './interfaces/reagentRequestService.interface';
import { CreateRequestDto, CreateRequestSuccessDto } from './dto/createRequest.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetReagentRequestDto, GetReagentRequestSuccessDto } from './dto/getReagentRequest.dto';
import { ValidateParseQueries } from './pipes/validateParseQueries.pipe';
import { ReagentRequestOptions } from './interfaces/reagentRequestOptions.interface';
import { ParseIdPipe } from 'src/common/pipes/parseId.pipe';
import { UpdateReagentRequestDto, UpdateReagentRequestSuccessDto } from './dto/updateReagentRequest.dto';

const ROUTE = 'reagent_requests';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class ReagentRequestController {
  private logger = new Logger(ReagentRequestController.name);
  constructor(@Inject(REQUEST_SERVICE_TOKEN) private requestService: IReagentRequestService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateRequestSuccessDto })
  @Roles(Role.Researcher)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async create(@Body() createRequestDto: CreateRequestDto, @Req() req: any) {
    const dtoWithUserId = {
      ...createRequestDto,
      userId: parseInt(req.user.id),
    };
    return await this.requestService.create(dtoWithUserId);
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
    } else {
      return await this.requestService.getReagentRequestsForResearchers(queryDto, user.id);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: UpdateReagentRequestSuccessDto })
  @Roles(Role.ProcurementOfficer)
  @UseGuards(AuthGuard, RolesGuard)
  @Post(':id')
  async editReagentRequest(@Param('id', ParseIdPipe) id: number, @Body() updateReagentRequestDto: UpdateReagentRequestDto) {
    try {
      const request = await this.requestService.getRequestById(id);
      if (!request) throw new NotFoundException('Reagent Request with this ID - NOT FOUND');
      return await this.requestService.editReagentRequest(updateReagentRequestDto, id);
    } catch (error) {
      this.logger.error('Error in controller path POST /:id ', error);
      throw error;
    }
  }
}
