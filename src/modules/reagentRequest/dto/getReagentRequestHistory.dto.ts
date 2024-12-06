import { ApiProperty } from "@nestjs/swagger";
import { AuditLogs, Entity } from "@prisma/client";

export class GetReagentRequestHistorySuccessDto {
    @ApiProperty({
        example: [{
            id: 12,
            userId: 31,
            action: 'CREATE REAGENT REQUEST',
            entity: Entity.ReagentRequest,
            oldData: null,
            newData: {
                id: 1,
                name: 'New Reagent Request',
                other: 'Other Fields of Reagent Request Table'
            },
            timestamp: new Date()
        }]
    })
    history: AuditLogs[] | null
}