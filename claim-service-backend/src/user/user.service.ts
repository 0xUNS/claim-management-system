import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: dto.email,
        profile: {
          update: {
            fullName: dto.fullName,
            phoneNumber: dto.phoneNumber,
            bio: dto.bio,
          },
        },
      },
    });
    delete user.hash;
    return user;
  }
}
