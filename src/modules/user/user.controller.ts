import { Body, Controller, Param, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseIdPipe } from 'src/common/pipes/parseId.pipe';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleGuardErrorDto } from 'src/common/dtos/role.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import {
  EditUserRoleDto,
  EditUserRoleErrorResponseDto,
  EditUserRoleSuccessResponseDto,
} from './dto/editRole.dto';
import { ParseIdPipeErrorDto } from 'src/common/dtos/parseId.dto';

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
  ) {
    const role: Role = body.role;
    return await this.userService.editUserRole(userId, role);
  }
}
