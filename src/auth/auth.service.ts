import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<any> {
    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hash: await argon.hash(dto.password),
          fullName: dto.fullName,
          phoneNumber: dto.phoneNumber,
          bio: dto.bio,
        },
      })
      .catch((error) => {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2002'
        )
          throw new ForbiddenException('Credentials incorrect');
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return { user, tokens };
  }

  async loginLocal(dto: AuthDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Access Denied');
    if (!(await argon.verify(user.hash, dto.password)))
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return { user, tokens };
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: { not: null },
      },
      data: { hashedRt: null },
    });
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user?.hashedRt) throw new ForbiddenException('Access Denied');

    if (!(await argon.verify(user.hashedRt, rt)))
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return { user, tokens };
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRt: await argon.hash(rt) },
    });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: this.config.get<string>('AT_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: this.config.get<string>('RT_EXPIRES_IN'),
      }),
    ]);

    return { access_token: at, refresh_token: rt };
  }
}
