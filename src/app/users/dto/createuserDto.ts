import { IsString, Length, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDTO {
  @IsString()
  @Length(1, 128)
  @Expose()
  name: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Length(8, 16)
  @Expose()
  password: string;
}
