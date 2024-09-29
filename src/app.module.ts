import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StatusModule } from './routes';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SecurityModule } from './modules/security/security.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StatusModule,
    UserModule,
    AuthModule,
    SecurityModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
