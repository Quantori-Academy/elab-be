import { Controller, Get, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { DASHBOARD_SERVICE_TOKEN } from './dashboard.service';
import { IDashboardService } from './interfaces/dashboardService.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminDashboardDto } from './dto/adminDashboard.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ResearcherDashboardDto } from './dto/researcherDashboard.dto';

const ROUTE = 'dashboard';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class DashboardController {
  constructor(@Inject(DASHBOARD_SERVICE_TOKEN) private readonly dashboardService: IDashboardService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: () => AdminDashboardDto })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  async adminDashboard() {
    return await this.dashboardService.adminDashboard();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: () => ResearcherDashboardDto })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Researcher)
  @Get('/researcher')
  async researcherDashboard() {
    return await this.dashboardService.researcherDashboard();
  }
}
