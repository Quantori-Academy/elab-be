import {
  Body,
  Controller,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditRoleDto } from './dto/editRole.dto';
import { ParseIntPipe } from 'src/common/pipes/parseInt.pipe';

const ROUTE = 'users';

@ApiTags(ROUTE)
@Controller(ROUTE)
export class UserController {
  @UsePipes()
  @Patch(':id/role')
  async editRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body(ValidationPipe) role: EditRoleDto,
  ) {
    console.log(userId, role);
    return 'ok';
  }
}
