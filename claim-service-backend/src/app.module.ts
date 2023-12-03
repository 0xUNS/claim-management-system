import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimModule } from './claim/claim.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ClaimModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
