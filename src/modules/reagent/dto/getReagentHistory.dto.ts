import { ApiProperty } from "@nestjs/swagger";
import { AuditLogs, Entity } from "@prisma/client";

export class GetReagentHistorySuccessDto {
    @ApiProperty({
        example: [{
            id: 1,
            userId: 3,
            action: 'CREATE REAGENT',
            entity: Entity.Reagent,
            oldData: null,
            newData: {
                id: 1,
                name: 'New Reagent',
                other: 'Other Fields of Reagent Table'
            },
            timestamp: new Date()
        }]
    })
    history: AuditLogs[] | null
}