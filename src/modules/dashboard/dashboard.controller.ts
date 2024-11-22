import { Controller, Get, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { DASHBOARD_SERVICE_TOKEN } from './dashboard.service';
import { IDashboardService } from './interfaces/dashboardService.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminDashboardDto } from './dto/adminDashboard.dto';

const ROUTE = 'dashboard';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class DashboardController {
  constructor(@Inject(DASHBOARD_SERVICE_TOKEN) private readonly dashboardService: IDashboardService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: () => AdminDashboardDto })
  @UseGuards(AuthGuard)
  @Get('/admin')
  async adminDashboard() {
    return await this.dashboardService.adminDashboard();
  }
}
