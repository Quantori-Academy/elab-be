import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { REAGENT_SERVICE_TOKEN } from './reagent.service';
import { IReagentService } from './interfaces/reagentService.interface';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateReagentDto, CreateReagentSuccessDto } from './dto/createReagent.dto';
import { GetReagentDto, GetReagentErrorDto, GetReagentSuccessDto } from './dto/getReagent.dto';
import { ValidateParseReagentOptionsPipe } from './pipes/validateParseQueries.pipe';
import { ReagentOptions, ReagentSearchOptions } from './interfaces/reagentOptions.interface';
import { SearchByStructureDto, SearchByStructureErrorDto, SearchByStructureSuccessDto } from './dto/searchByStructure.dto';
import { ValidateParseForSearchPipe } from './pipes/validateParseForSearch.pipe';
import { UpdateReagentDto, UpdateReagentSuccessDto } from './dto/updateReagent.dto';
import { ParseIdPipe } from 'src/common/pipes/parseId.pipe';
import { IReagent } from './interfaces/reagentEntity.interface';
import { SAMPLE_SERVICE_TOKEN } from './sample.service';
import { ISampleService } from './interfaces/sampleService.interface';
import { CreateSampleDto, CreateSampleSuccessDto } from './dto/createSample.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guard';

const ROUTE = 'reagents';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class ReagentController {
  private logger = new Logger(ReagentController.name);

  constructor(
    @Inject(REAGENT_SERVICE_TOKEN) private reagentService: IReagentService,
    @Inject(SAMPLE_SERVICE_TOKEN) private sampleService: ISampleService,
  ) {}

  @ApiBearerAuth()
  @ApiBody({ type: () => CreateReagentDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: () => CreateReagentSuccessDto })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Researcher)
  @Post('')
  async createReagent(@Body(new ValidationPipe({ transform: true })) createReagentDto: CreateReagentDto) {
    return await this.reagentService.create({ ...createReagentDto, category: 'Reagent' });
  }

  @ApiBearerAuth()
  @ApiQuery({ type: () => GetReagentDto })
  @ApiResponse({ status: HttpStatus.OK, type: () => GetReagentSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: () => GetReagentErrorDto })
  @UseGuards(AuthGuard)
  @Get('')
  async getReagents(@Query(ValidateParseReagentOptionsPipe) getReagentDto: ReagentOptions) {
    return await this.reagentService.getReagents(getReagentDto);
  }

  @ApiBearerAuth()
  @ApiQuery({ type: () => SearchByStructureDto })
  @ApiResponse({ status: HttpStatus.OK, type: () => SearchByStructureSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: () => SearchByStructureErrorDto })
  @UseGuards(AuthGuard)
  @Get('/search')
  async searchByStructure(@Query(ValidateParseForSearchPipe) searchByStructureDto: ReagentSearchOptions) {
    return await this.reagentService.searchByStructure(searchByStructureDto);
  }

  @ApiBearerAuth()
  @ApiBody({ type: () => UpdateReagentDto })
  @ApiResponse({ status: HttpStatus.OK, type: () => UpdateReagentSuccessDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @UseGuards(AuthGuard)
  @Post(':id')
  async editReagent(
    @Body(new ValidationPipe({ transform: true })) updateReagentDto: UpdateReagentDto,
    @Param('id', ParseIdPipe) id: number,
  ) {
    try {
      this.logger.log('editReagent route start');
      const reagent = await this.reagentService.getReagentById(id);
      if (!reagent) throw new NotFoundException('Reagent Not Found!');
      return await this.reagentService.editReagent(updateReagentDto, id);
    } catch (error) {
      this.logger.error('Error in controller in POST editReagent: ', error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: () => GetReagentSuccessDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getReagentById(@Param('id', ParseIdPipe) id: number): Promise<IReagent> {
    try {
      this.logger.log('getReagentById route start');
      const reagent: IReagent | null = await this.reagentService.getReagentById(id);
      if (!reagent) throw new NotFoundException('Reagent Not Found!');
      return reagent;
    } catch (error) {
      this.logger.error('Error in controller in POST editReagent: ', error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiBody({ type: () => CreateSampleDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: () => CreateSampleSuccessDto })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Researcher)
  @Post('/create/sample')
  async createSample(@Body(new ValidationPipe({ transform: true })) createSampleDto: CreateSampleDto) {
    return await this.sampleService.create(createSampleDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: () => GetReagentSuccessDto })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteReagentById(@Param('id', ParseIdPipe) id: number) {
    const reagent: IReagent | null = await this.reagentService.getReagentById(id);
    if (!reagent) throw new NotFoundException('Reagent Not Found!');
    return await this.reagentService.deleteReagentById(id);
  }
}
