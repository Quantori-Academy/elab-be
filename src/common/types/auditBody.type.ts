import { Entity } from "@prisma/client";


export type AuditBody = {
    userId?: number;
    action: string;
    entity?: Entity;
    oldData?: Record<string, any>;
    newData?: Record<string, any>;
}