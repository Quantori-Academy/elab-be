import { Body, Controller, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { REQUEST_SERVICE_TOKEN } from './reagentRequest.service';
import { IReagentRequestService } from './interfaces/reagentRequestService.interface';
import { CreateRequestDto, CreateRequestSuccessDto } from './dto/createRequest.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

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
}
