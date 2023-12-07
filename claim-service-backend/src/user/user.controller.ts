import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser, GetUserId } from '../auth/decorator';
import { AtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(AtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUserId() userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
