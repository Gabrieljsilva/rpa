import { Controller, Post, Get, Body, ConflictException } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createuserDto';
import { Protect } from '../sessions/protect.decorator';
import { ValidationPipe } from '../utils/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Protect('users')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Protect('users')
  @Post()
  async create(@Body(new ValidationPipe()) userDto: CreateUserDTO) {
    const userExists = await this.usersService.checkIfUserExistsByEmail(
      userDto.email,
    );

    if (userExists) {
      throw new ConflictException('user already exists');
    }
    const user = await this.usersService.store(userDto);
    delete user.password;
    return user;
  }
}
