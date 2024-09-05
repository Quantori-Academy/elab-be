import { Module } from '@nestjs/common';
import { SERVICES } from './services';
import { StatusController } from './controller';

@Module({
  controllers: [StatusController],
  providers: [...SERVICES],
})
export class StatusModule {}
