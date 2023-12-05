import { Module } from '@nestjs/common';
import { AuthController } from './auth.contoller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AtStrategy, RtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, PrismaService],
})
export class AuthModule {}
