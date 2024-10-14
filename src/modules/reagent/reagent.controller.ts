import { Body, Controller, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { REAGENT_SERVICE_TOKEN } from './reagent.service';
import { IReagentService } from './interfaces/reagentService.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateReagentDto, CreateReagentSuccessDto } from './dto/createReagent.dto';

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
}
