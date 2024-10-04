import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseIdPipe } from 'src/common/pipes/parseId.pipe';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleGuardErrorDto } from 'src/common/dtos/role.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ParseIdPipeErrorDto } from 'src/common/dtos/parseId.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UserPayload } from './interfaces/userEntity.interface';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { EditUserRoleDto, EditUserRoleErrorResponseDto, EditUserRoleSuccessResponseDto } from './dto/editRole.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto, CreateUserErrorDto, CreateUserValidationErrorDto } from './dto/createUser.dto';

const ROUTE = 'users';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: EditUserRoleSuccessResponseDto })
  @ApiResponse({ status: 400, type: ParseIdPipeErrorDto })
  @ApiResponse({ status: 401, type: EditUserRoleErrorResponseDto })
  @ApiResponse({ status: 403, type: RoleGuardErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id/role')
  async editRole(
    @Param('id', ParseIdPipe) userId: number,
    @Body(ValidationPipe) body: EditUserRoleDto,
  ): Promise<UserPayload> {
    const role: Role = body.role;
    return await this.userService.editUserRole(userId, role);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateUserDto })
  @ApiResponse({ status: 400, type: CreateUserValidationErrorDto })
  @ApiResponse({ status: 403, type: RoleGuardErrorDto })
  @ApiResponse({ status: 409, type: CreateUserErrorDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create-user')
  async createUser(@Body(ValidationPipe) user: CreateUserDto): Promise<UserPayload> {
    return this.userService.createUser(user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User is deleted' })
  @ApiResponse({ status: 404, description: 'User not Found' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIdPipe) id: number) {
    try {
      await this.userService.deleteUser(id);
      return {
        message: 'User is deleted!',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'The password is changed successfully' })
  @ApiResponse({ status: 400, description: 'Wrong Password' })
  @ApiResponse({ status: 404, description: 'The User is not found' })
  @Post('change-password')
  @UseGuards(AuthGuard)
  async changePassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto) {
    const user: UserPayload = (req as any).user as UserPayload;
    await this.userService.changePassword(
      user.id as number,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
    return {
      message: 'The password is changed successfully',
    };
  }

  @ApiResponse({ status: 201, description: 'The link to reset password is sent to email' })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.userService.forgotPassword(forgotPasswordDto.email);
    return {
      message: 'The link is sent to your email. Please check it',
    };
  }

  @ApiResponse({ status: 201, description: 'The password is reset successfully' })
  @ApiResponse({ status: 400, description: 'Passwords do not match' })
  @ApiResponse({ status: 404, description: 'The User is not found' })
  @Post('reset-password')
  async resetPassword(@Query('reset_token') reset_token: string, @Body() resetPasswordDto: ResetPasswordDto) {
    await this.userService.resetPassword(reset_token, resetPasswordDto.newPassword, resetPasswordDto.confirmPassword);
    return {
      message: 'The password reset successfully',
    };
  }
}
