import { Module } from '@nestjs/common';
import { StatusModule } from './routes';

@Module({
  imports: [StatusModule],
})
export class AppModule {}
