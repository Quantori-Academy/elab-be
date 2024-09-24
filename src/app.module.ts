import { Module } from '@nestjs/common';
import { StatusModule } from './routes';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [StatusModule, UserModule, AuthModule],
})
export class AppModule {}
