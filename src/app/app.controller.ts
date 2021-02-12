import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Protect } from './auth/protect.decorator';

@ApiTags('root')
@Controller()
export class AppController {
  @Protect()
  @Get()
  index() {
    return 'Hello World';
  }
}
