import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersActions } from './users.actions';
import { UsersController } from './users.controller';

import { User } from '../../shared/database/entities/User';
import { Role } from '../../shared/database/entities/Role';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersActions],
  exports: [UsersService],
})
export class UsersModule {}
