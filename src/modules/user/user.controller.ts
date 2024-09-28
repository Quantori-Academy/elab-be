import { Body, Controller, Param, Patch, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditRoleDto } from './dto/editRole.dto';
import { ParseIntPipe } from 'src/common/pipes/parseInt.pipe';
import { UserService } from './user.service';
import { Role } from '@prisma/client';

const ROUTE = 'users';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch(':id/role')
  async editRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body(ValidationPipe) body: EditRoleDto,
  ) {
    const role: Role = body.role;
    return await this.userService.editRole(userId, role);
  }
}
