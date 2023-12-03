import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  cleanDb() {
    return this.$transaction([
      this.claim.deleteMany(),
      this.profile.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
