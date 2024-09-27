// import { UserService } from 'src/modules/user/user.service';
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { IUser, UserPayload } from 'src/modules/user/interfaces/userEntity.interface';
// import { Request } from 'express';
// import { SecurityService } from 'src/modules/security/security.service';

// @Injectable()
// export class RefreshTokenGuard implements CanActivate {
//   constructor(private securityService: SecurityService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request: Request = context.switchToHttp().getRequest();

//     const refreshToken = request.cookies?.refresh_token;
//     if (!refreshToken) {
//      throw new UnauthorizedException('Refresh token not found.');
//    }

//    const validToken: IUser | null = await this.securityService.verifyToken(email, password);
//     if (!validToken) {
//       throw new UnauthorizedException('Invalid credentials.');
//     }

//     return true;
//   }
// }
