import { Role } from '@prisma/client';

export interface IDashboardService {
  adminDashboard(): Promise<AdminReturnObject>;
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
