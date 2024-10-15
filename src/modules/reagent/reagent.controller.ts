import { Body, Controller, Get, HttpStatus, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { REAGENT_SERVICE_TOKEN } from './reagent.service';
import { IReagentService } from './interfaces/reagentService.interface';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateReagentDto, CreateReagentSuccessDto } from './dto/createReagent.dto';
import { GetReagentDto, GetReagentErrorDto, GetReagentSuccessDto } from './dto/getReagent.dto';
import { ValidateParseReagentOptionsPipe } from './pipes/validateParseQueries.pipe';
import { ReagentOptions } from './interfaces/reagentOptions.interface';

const ROUTE = 'reagents';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class ReagentController {
  constructor(@Inject(REAGENT_SERVICE_TOKEN) private reagentService: IReagentService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateReagentSuccessDto })
  @UseGuards(AuthGuard)
  @Post('')
  async createReagent(@Body() createReagentDto: CreateReagentDto) {
    return await this.reagentService.create(createReagentDto);
  }

  @ApiBearerAuth()
  @ApiQuery({ type: () => GetReagentDto })
  @ApiResponse({ status: HttpStatus.OK, type: [GetReagentSuccessDto] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: GetReagentErrorDto })
  @UseGuards(AuthGuard)
  @Get('')
  async getReagents(@Query(ValidateParseReagentOptionsPipe) getReagentDto: ReagentOptions) {
    return await this.reagentService.getReagents(getReagentDto);
  }
}
