import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../utils/user.decorator';
import { User as UserEntity } from '../../shared/database/entities/User';
import { SessionsService } from './sessions.service';

import { Protect } from './protect.decorator';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}
  @Protect('sessions', UseGuards(AuthGuard('local')))
  @Post()
  async create(@User() user: UserEntity) {
    const accessToken = await this.sessionsService.issueAccessToken(user.id);
    return { user, accessToken };
  }
}
