import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminReturnObject, IDashboardService, ResearcherReturnObject } from './interfaces/dashboardService.interface';
import { IReagent } from '../reagent/interfaces/reagentEntity.interface';

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
      this.logger.log(`${this.adminDashboard.name} - Finished`);
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

  async researcherDashboard(): Promise<ResearcherReturnObject> {
    try {
      this.logger.log(`${this.researcherDashboard.name} - Start`);
      const reagentsVsSampleNumber = await this.prisma.reagent.groupBy({
        by: ['category'],
        _count: { id: true },
      });
      const reagentsVsSampleExpiredNumber = await this.prisma.reagent.groupBy({
        by: ['category'],
        where: {
          expirationDate: {
            gt: new Date(),
          },
        },
        _count: { id: true },
      });
      const reagentsVsSampleEmptyNumber = await this.prisma.reagent.groupBy({
        by: ['category'],
        where: {
          quantityLeft: 0,
        },
        _count: { id: true },
      });
      const threeDaysLater = new Date();
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);
      const expiredList: IReagent[] = await this.prisma.reagent.findMany({
        where: {
          OR: [{ expirationDate: { gte: new Date() } }, { expirationDate: { lte: threeDaysLater } }],
        },
        take: 10,
      });
      const reagents = await this.prisma.reagent.findMany();
      const emptyList: IReagent[] = reagents.filter(
        (reagent) => reagent.quantityLeft <= reagent.totalQuantity / 2 || reagent.quantityLeft === 0,
      );

      return {
        reagentsVsSampleNumber,
        reagentsVsSampleExpiredNumber,
        reagentsVsSampleEmptyNumber,
        expiredList,
        emptyList,
      };
    } catch (error) {
      this.logger.log(`${this.researcherDashboard.name} - Error - ${error}`);
      throw error;
    }
  }
}

export const DASHBOARD_SERVICE_TOKEN = Symbol('DASHBOARD_SERVICE_TOKEN');
export const DashboardServiceProvider = {
  provide: DASHBOARD_SERVICE_TOKEN,
  useClass: DashboardService,
};
