import { Controller, Get } from '@nestjs/common';
import { StatusService } from '../services';
import { BffHealthCheck } from '../entities';

@Controller('status')
export class StatusController {
  constructor(private readonly _statusService: StatusService) {}

  @Get('/bff-healthcheck')
  public getBffHealthcheck(): BffHealthCheck {
    return this._statusService.getBffHealthcheck();
  }
}
