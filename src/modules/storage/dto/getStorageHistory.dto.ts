import { ApiProperty } from "@nestjs/swagger";
import { AuditLogs, Entity } from "@prisma/client";

export class GetStorageHistorySuccessDto {
    @ApiProperty({
        example: [{
            id: 100,
            userId: 23,
            action: 'DELETE STORAGE',
            entity: Entity.Storage,
            oldData: {
                id: 24,
                name: 'Storage 24',
                other: 'Other Fields of Storage Table'
            },
            newData: null,
            timestamp: new Date()
        }]
    })
    history: AuditLogs[] | null
}