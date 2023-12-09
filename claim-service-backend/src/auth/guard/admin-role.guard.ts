import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Role } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('AdminRoleGuard =>', request.user);
    // if (request?.user) {
    //   const { id } = request.user;
    //   const user = await this.userService.getUserById(id);
    //   console.log('AdminRoleGuard =>', user);
    //   return user.role === Role.BO_AGENT;
    // }

    return false;
  }
}
