import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { AuditBody } from "../types/auditBody.type";
import { AuditLogs, Entity } from "@prisma/client";

@Injectable()
export class AuditLogService {
    constructor(private prisma: PrismaService) {}
    private logger = new Logger(AuditLogService.name);

    async createAuditLog(auditBody: AuditBody): Promise<void> {
        try {
            this.logger.log(`${this.createAuditLog.name} - START`);
            await this.prisma.auditLogs.create({
                data: auditBody,
            })
            this.logger.log(`${this.createAuditLog.name} - FINISH`);
        } catch (error) {
            this.logger.error(`${this.createAuditLog.name} - ERROR`, error);
            throw error;
        }
    }

    async getHistory(entity: Entity): Promise<AuditLogs[] | null> {
        try {
            this.logger.log(`${this.getHistory.name} - START`);
            const history = await this.prisma.auditLogs.findMany({
                where: {entity},
                orderBy: {
                    timestamp: 'desc'
                }
            });
            this.logger.log(`${this.getHistory.name} - FINISH`); 
            return history;
        } catch (error) {
            this.logger.error(`${this.getHistory.name} - ERROR`, error);
            throw error; 
        }
    }
}