import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  index(@Res() res) {
    res.status(302).redirect('/api');
  }

  @Public()
  @Get('health')
  health() {
    return this.appService.health();
  }
}
