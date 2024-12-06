import { ApiProperty } from "@nestjs/swagger";
import { AuditLogs, Entity, Status } from "@prisma/client";

export class GetOrderHistorySuccessDto {
    @ApiProperty({
        example: [{
            id: 1,
            userId: 3,
            action: 'CREATE ORDER',
            entity: Entity.Order,
            oldData: null,
            newData: {
                id: 1,
                title: 'Some Order Title',
                seller: 'Bayer',
                status: Status.Pending
            },
            timestamp: new Date()
        }]
    })
    history: AuditLogs[] | null;
}