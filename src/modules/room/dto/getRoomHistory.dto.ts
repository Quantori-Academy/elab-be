import { ApiProperty } from "@nestjs/swagger";
import { AuditLogs, Entity } from "@prisma/client";

export class GetRoomHistorySuccessDto {
    @ApiProperty({
        example: [{
            id: 13,
            userId: 5,
            action: 'CREATE ROOM',
            entity: Entity.Room,
            oldData: null,
            newData: {
                id: 1,
                name: 'Room 19',
                other: 'Other Fields of Room Table'
            },
            timestamp: new Date()
        }]
    })
    history: AuditLogs[] | null
}