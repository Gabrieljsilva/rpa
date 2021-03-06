import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';

const JwtModuleConfig = {
  secret: process.env.APP_SECRET,
  signOptions: { expiresIn: '1h' },
};

@Global()
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(JwtModuleConfig)],
  providers: [AuthService, LocalStrategy, AuthActions],
  controllers: [AuthController],
  exports: [UsersModule, JwtModule.register(JwtModuleConfig)],
})
export class AuthModule {}
