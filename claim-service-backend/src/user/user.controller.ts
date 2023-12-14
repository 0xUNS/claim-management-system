import { Body, Controller, Get, Patch } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('current')
  getMe(@GetUser('sub') userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }

  @Patch()
  editUser(@GetUser('sub') userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
