import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetUser, Public } from './decorator';
import { RtGuard } from './guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/register')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<any> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  loginLocal(@Body() dto: AuthDto): Promise<any> {
    return this.authService.loginLocal(dto);
  }

  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('sub') userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @ApiBearerAuth()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser('sub') userId: string,
    @GetUser('refreshToken') refreshToken: string,
  ): Promise<any> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
