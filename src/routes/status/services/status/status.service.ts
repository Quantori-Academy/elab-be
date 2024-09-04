import { Injectable } from '@nestjs/common';
import { BffHealthCheck, STATUS } from '../../entities';

@Injectable()
export class StatusService {
  public getBffHealthcheck(): BffHealthCheck {
    return {
      status: STATUS.OK,
    };
  }
}
