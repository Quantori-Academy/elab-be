import { Module } from '@nestjs/common';
import { StatusService } from './services';
import { StatusController } from './controller';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
