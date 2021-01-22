import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Protect } from './sessions/protect.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Protect('index')
  @Get()
  index() {
    return { hello: 'World' };
  }
}
