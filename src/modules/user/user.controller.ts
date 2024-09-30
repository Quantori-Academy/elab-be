import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UserPayload } from './interfaces/userEntity.interface';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';

const ROUTE = 'user';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('change-password')
  //@UseGuards(AuthGuard)
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

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.userService.forgotPassword(forgotPasswordDto.email);
    return {
      message: 'The link is sent to your email. Please check it',
    };
  }
}
