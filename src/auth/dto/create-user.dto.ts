import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @MinLength(2)
  name: string;

  @ApiProperty({ enum: ['USER', 'SELLER'] })
  @IsEnum(['USER', 'SELLER'])
  role: 'USER' | 'SELLER';
}
