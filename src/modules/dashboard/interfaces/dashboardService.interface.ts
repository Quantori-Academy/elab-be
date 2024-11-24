import { Prisma, Role } from '@prisma/client';
import { IReagent } from 'src/modules/reagent/interfaces/reagentEntity.interface';

export interface IDashboardService {
  adminDashboard(): Promise<AdminReturnObject>;
  researcherDashboard(): Promise<ResearcherReturnObject>;
}

export type AdminReturnObject = {
  roomNumber: number;
  storageNumber: number;
  userNumber: number;
  storageNumberInRoom: {
    roomId: number;
    _count: {
      id: number;
    };
  }[];
  userNumberInRoles: {
    role: Role;
    _count: {
      id: number;
    };
  }[];
};

export type ResearcherReturnObject = {
  reagentsVsSampleNumber: (Prisma.PickEnumerable<Prisma.ReagentGroupByOutputType, 'category'[]> & {
    _count: {
      id: number;
    };
  })[];
  reagentsVsSampleExpiredNumber: (Prisma.PickEnumerable<Prisma.ReagentGroupByOutputType, 'category'[]> & {
    _count: {
      id: number;
    };
  })[];
  reagentsVsSampleEmptyNumber: (Prisma.PickEnumerable<Prisma.ReagentGroupByOutputType, 'category'[]> & {
    _count: {
      id: number;
    };
  })[];
  expiredList: IReagent[];
  emptyList: IReagent[];
};
