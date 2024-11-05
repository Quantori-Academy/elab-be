import { Module } from '@nestjs/common';
import { ReagentServiceProvider } from './reagent.service';
import { ReagentRepositoryProvider } from './reagent.repository';
import { ReagentController } from './reagent.controller';
import { SampleServiceProvider } from './sample.service';
import { ReagentRequestModule } from '../reagentRequest/reagentRequest.module';

@Module({
  imports: [ReagentRequestModule],
  controllers: [ReagentController],
  providers: [ReagentServiceProvider, ReagentRepositoryProvider, SampleServiceProvider],
})
export class ReagentModule {}
