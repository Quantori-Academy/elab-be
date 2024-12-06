import { ApiProperty } from "@nestjs/swagger";
import { AuditLogs, Entity, Role } from "@prisma/client";

export class GetUserHistorySuccessDto {
    @ApiProperty({
        example: [{
            id: 1,
            userId: 3,
            action: 'CREATE USER',
            entity: Entity.User,
            oldData: null,
            newData: {
                id: 12,
                email: 'new2054@elab.com',
                role: Role.Researcher,
                other: 'Other Fields of User Table'
            },
            timestamp: new Date()
        }]
    })
    history: AuditLogs[] | null
}