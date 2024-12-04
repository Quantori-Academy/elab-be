import { Entity } from "@prisma/client";


export type AuditBody = {
    userId?: number;
    action: string;
    entity?: Entity;
    oldData?: any | null;
    newData?: any | null;
}