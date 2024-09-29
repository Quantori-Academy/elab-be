import { Body, Controller, Param, Patch, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/common/pipes/parseInt.pipe';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  EditUserRoleDto,
  EditUserRoleErrorResponseDto,
  EditUserRoleSuccessResponseDto,
} from './dto/editRole.dto';
import { RoleGuardErrorDto } from 'src/common/dtos/role.dto';

const ROUTE = 'users';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ status: 200, type: EditUserRoleSuccessResponseDto })
  @ApiResponse({ status: 401, type: EditUserRoleErrorResponseDto })
  @ApiResponse({ status: 403, type: RoleGuardErrorDto })
  @Roles(Role.Admin)
  @Patch(':id/role')
  async editRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body(ValidationPipe) body: EditUserRoleDto,
  ) {
    const role: Role = body.role;
    return await this.userService.editUserRole(userId, role);
  }
}
