import {
  Body,
  Controller,
  Get,
  Delete,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseIdPipe } from 'src/common/pipes/parseId.pipe';
import { USER_SERVICE_TOKEN } from './user.service';
import { Entity, Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ForbiddenErrorDto } from 'src/common/dtos/forbidden.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ParseIdPipeErrorDto } from 'src/common/dtos/parseId.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UserPayload } from './interfaces/userEntity.interface';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { EditUserRoleDto, EditUserRoleErrorResponseDto, EditUserRoleSuccessResponseDto } from './dto/editRole.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto, CreateUserErrorDto, CreateUserSuccessDto, CreateUserValidationErrorDto } from './dto/createUser.dto';
import { IUserService } from './interfaces/userService.interface';
import { GetUserErrorDto, GetUserSuccessDto } from './dto/getUser.dto';
import { TokenErrorResponseDto } from '../security/dto/token.dto';
import { AuditLogService } from 'src/common/services/auditLog.service';
import { GetUserHistorySuccessDto } from './dto/getUserHistory.dto';

const ROUTE = 'users';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);

  constructor(@Inject(USER_SERVICE_TOKEN) private userService: IUserService, private auditLogService: AuditLogService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: EditUserRoleSuccessResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ParseIdPipeErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: EditUserRoleErrorResponseDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id/role')
  async editRole(@Param('id', ParseIdPipe) userId: number, @Body(ValidationPipe) body: EditUserRoleDto, @Req() req: any): Promise<UserPayload> {
    try {
      const user: UserPayload = (req as any).user as UserPayload; 
      const role: Role = body.role;
      const oldRole = await this.userService.getUser(userId);
      const newRole =  await this.userService.editUserRole(userId, role);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: `UPDATE ROLE OF USER (id:${userId})`,
        entity: Entity.User,
        oldData: oldRole,
        newData: newRole
      });
      return newRole;
    } catch (error) {
      this.logger.error(`[${this.editRole.name}] - Exception thrown` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: CreateUserValidationErrorDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: CreateUserErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async createUser(@Body(ValidationPipe) user: CreateUserDto, @Req() req: any): Promise<UserPayload> {
    try {
      const user: UserPayload = (req as any).user as UserPayload;
      const newUser = this.userService.createUser(user);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: `CREATE USER`,
        entity: Entity.User,
        newData: newUser
      });
      return newUser;
    } catch (error) {
      this.logger.error(`[${this.createUser.name}] - Exception thrown` + error);
      throw error; 
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The temporary password is send to user email. User needs to change password after login',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The User is not found' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/:id/reset-password')
  async adminResetPassword(@Param('id', ParseIdPipe) id: number, @Req() req: any) {
    try {
      const user: UserPayload = (req as any).user as UserPayload;
      await this.userService.adminResetPassword(id);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: `RESET USER PASSWORD INITIATED BY ADMIN`,
        entity: Entity.User,
      });
      return {
        message: 'The temporary password is sent to email of the user',
      };
    } catch (error) {
      this.logger.error(`[${this.adminResetPassword.name}] - Exception thrown` + error);
      throw error; 
    }
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User is deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not Found' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIdPipe) id: number, @Req() req: any) {
    try {
      const user: UserPayload = (req as any).user as UserPayload;
      const deletedUser = await this.userService.deleteUser(id);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: `DELETE USER`,
        entity: Entity.User,
        oldData: deletedUser
      });
      return {
        message: 'User is deleted!',
      };
    } catch (error) {
      this.logger.error(`[${this.deleteUser.name}] - Exception thrown` + error);
      throw error; 
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The password is changed successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Wrong Password' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The User is not found' })
  @Post('change-password')
  @UseGuards(AuthGuard)
  async changePassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto) {
    try {
      const user: UserPayload = (req as any).user as UserPayload;
      await this.userService.changePassword(user.id as number, changePasswordDto.oldPassword, changePasswordDto.newPassword);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: `CHANGE PASSWORD BY USER`,
        entity: Entity.User,
      });
      return {
        message: 'The password is changed successfully',
      };
    } catch (error) {
      this.logger.error(`[${this.changePassword.name}] - Exception thrown` + error);
      throw error; 
    }
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'The link to reset password is sent to email' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User with this email not found' })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto, @Req() req:any) {
    try {
      const user: UserPayload = (req as any).user as UserPayload;
      await this.userService.forgotPassword(forgotPasswordDto.email);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: `USER FORGOT PASSWORD, REQUESTED TO RESET`,
        entity: Entity.User,
      });
      return {
        message: 'The link is sent to your email. Please check it',
      };
    } catch (error) {
      this.logger.error(`[${this.forgotPassword.name}] - Exception thrown` + error);
      throw error; 
    }
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'The password is reset successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Passwords do not match' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The User is not found' })
  @Post('reset-password')
  async resetPassword(@Query('reset_token') reset_token: string, @Body() resetPasswordDto: ResetPasswordDto, @Req() req:any) {
    try {
      const user: UserPayload = (req as any).user as UserPayload;
      await this.userService.resetPassword(reset_token, resetPasswordDto.newPassword, resetPasswordDto.confirmPassword);
      await this.auditLogService.createAuditLog({
        userId: user.id!,
        action: `USER RESETTED PASSWORD`,
        entity: Entity.User,
      });
      return {
        message: 'The password reset successfully',
      };
    } catch (error) {
      this.logger.error(`[${this.resetPassword.name}] - Exception thrown` + error);
      throw error; 
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: [GetUserSuccessDto] })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('')
  async getUsers() {
    this.logger.log(`[${this.getUsers.name}] - Method start`);
    try {
      const users: UserPayload[] = await this.userService.getUsers();
      this.logger.log(`[${this.getUsers.name}] - Method finished`);
      return users;
    } catch (error) {
      this.logger.error(`[${this.getUsers.name}] - Exception thrown` + error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: GetUserSuccessDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: GetUserErrorDto })
  @UseGuards(AuthGuard)
  @Get('current')
  async getCurrentLoggedInUser(@Req() req: Request) {
    const user: UserPayload = (req as any).user as UserPayload;
    return await this.userService.getUser(user.id as number);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: GetUserSuccessDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ParseIdPipeErrorDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: TokenErrorResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: GetUserErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async getUser(@Param('id', ParseIdPipe) userId: number) {
    return await this.userService.getUser(userId);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: GetUserHistorySuccessDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/history/log')
  async getUserHistory() {
    try {
      const history = await this.auditLogService.getHistory(Entity.User);
      return history;
    } catch (error) {
      this.logger.error(`[${this.getUserHistory.name}] - Exception thrown: ` + error);
      throw error; 
    }
  }
}
