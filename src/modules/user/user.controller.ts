import { Body, Controller, Param, Patch, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  EditRoleDto,
  EditRoleErrorResponseDto,
  EditRoleSuccessResponseDto,
} from './dto/editRole.dto';
import { ParseIntPipe } from 'src/common/pipes/parseInt.pipe';
import { UserService } from './user.service';
import { Role } from '@prisma/client';

const ROUTE = 'users';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ status: 200, type: EditRoleSuccessResponseDto })
  @ApiResponse({ status: 401, type: EditRoleErrorResponseDto })
  @Patch(':id/role')
  async editRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body(ValidationPipe) body: EditRoleDto,
  ) {
    const role: Role = body.role;
    return await this.userService.editRole(userId, role);
  }
}
