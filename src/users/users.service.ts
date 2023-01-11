import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async updateRefreshToken(id: number, token: string) {
    return await this.usersRepository.update(
      {
        id,
      },
      {
        refreshToken: token,
      },
    );
  }
  async removeRefreshToken(id: number) {
    return await this.usersRepository.update(
      {
        id,
      },
      {
        refreshToken: null,
      },
    );
  }
}
