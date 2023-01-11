import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class AuthDto extends PartialType(CreateUserDto) {
  email: string;
  password: string;
}
