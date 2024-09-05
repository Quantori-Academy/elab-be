import { StatusService } from './status/status.service';
import { StatusORMService } from './orm/orm.service';

export { StatusORMService, StatusService };

export const SERVICES = [StatusORMService, StatusService];
