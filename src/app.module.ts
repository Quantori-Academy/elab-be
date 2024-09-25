import { Module } from '@nestjs/common';
import { StatusModule } from './routes';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SecurityModule } from './modules/security/security.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StatusModule,
    UserModule,
    AuthModule,
    SecurityModule,
  ],
})
export class AppModule {}
