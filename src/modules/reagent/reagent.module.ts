import { Module } from '@nestjs/common';
import { ReagentServiceProvider } from './reagent.service';
import { ReagentRepositoryProvider } from './reagent.repository';
import { ReagentController } from './reagent.controller';

@Module({
  controllers: [ReagentController],
  providers: [ReagentServiceProvider, ReagentRepositoryProvider],
})
export class ReagentModule {}
