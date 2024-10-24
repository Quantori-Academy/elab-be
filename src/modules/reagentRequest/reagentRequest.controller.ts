import { Body, Controller, Get, HttpStatus, Inject, Post, Query, Req, UseGuards } from '@nestjs/common';
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

const ROUTE = 'reagent_requests';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class ReagentRequestController {
  constructor(@Inject(REQUEST_SERVICE_TOKEN) private requestService: IReagentRequestService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateRequestSuccessDto })
  @Roles(Role.Researcher)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async create(@Body() createRequestDto: CreateRequestDto) {
    return await this.requestService.create(createRequestDto);
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
}
