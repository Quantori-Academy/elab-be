import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IReagent } from 'src/modules/reagent/interfaces/reagentEntity.interface';

export class ResearcherDashboardDto {
  @ApiProperty({ description: 'Number of Reagents and Samples' })
  reagentsVsSampleNumber: (Prisma.PickEnumerable<Prisma.ReagentGroupByOutputType, 'category'[]> & {
    _count: {
      id: number;
    };
  })[];

  @ApiProperty({ description: 'Number of Reagents and Samples - Expired' })
  reagentsVsSampleExpiredNumber: (Prisma.PickEnumerable<Prisma.ReagentGroupByOutputType, 'category'[]> & {
    _count: {
      expirationDate: number;
    };
  })[];

  @ApiProperty({ description: 'Number of Reagents and Samples - Empty' })
  reagentsVsSampleEmptyNumber: (Prisma.PickEnumerable<Prisma.ReagentGroupByOutputType, 'category'[]> & {
    _count: {
      expirationDate: number;
    };
  })[];

  @ApiProperty({ description: 'List of Reagents and Samples - Expired or near to expiration' })
  expiredList: IReagent[];

  @ApiProperty({ description: 'List of Reagents and Samples - Empty or equal or less than a half of TotalQuantity' })
  emptyList: IReagent[];
}
