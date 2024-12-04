import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { AuditBody } from "../types/auditBody.type";

@Injectable()
export class AuditLogService {
    constructor(private prisma: PrismaService) {}
    private logger = new Logger(AuditLogService.name);

    async createAuditLog(auditBody: AuditBody) {
        try {
            this.logger.log(`${this.createAuditLog.name} - START`);
            await this.prisma.auditLogs.create({
                data: auditBody,
            })
            this.logger.log(`${this.createAuditLog.name} - FINISH`);
        } catch (error) {
            this.logger.error(`${this.createAuditLog.name} - ERROR`, error.message);
            throw error;
        }
    }
}