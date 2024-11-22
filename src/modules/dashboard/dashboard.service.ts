import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminReturnObject, IDashboardService } from './interfaces/dashboardService.interface';

@Injectable()
class DashboardService implements IDashboardService {
  private readonly logger: Logger = new Logger(DashboardService.name);

  constructor(private readonly prisma: PrismaService) {}

  async adminDashboard(): Promise<AdminReturnObject> {
    try {
      this.logger.log(`${this.adminDashboard.name} - Start`);
      const roomNumber = await this.prisma.room.count({
        where: {},
      });
      const storageNumber = await this.prisma.storage.count();
      const userNumber = await this.prisma.user.count();
      const storageNumberInRoom = await this.prisma.storage.groupBy({
        by: ['roomId'],
        _count: { id: true },
      });
      const userNumberInRoles = await this.prisma.user.groupBy({
        by: ['role'],
        _count: { id: true },
      });
      return {
        roomNumber,
        storageNumber,
        userNumber,
        storageNumberInRoom,
        userNumberInRoles,
      };
    } catch (error) {
      this.logger.log(`${this.adminDashboard.name} - Error - ${error}`);
      throw error;
    }
  }
}

export const DASHBOARD_SERVICE_TOKEN = Symbol('DASHBOARD_SERVICE_TOKEN');
export const DashboardServiceProvider = {
  provide: DASHBOARD_SERVICE_TOKEN,
  useClass: DashboardService,
};
