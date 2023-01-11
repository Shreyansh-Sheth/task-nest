import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private usersRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, sellerId: number) {
    return await this.usersRepository.save({
      ...createBookDto,
      seller: { id: sellerId },
    });
  }

  async findAll(limit = 10, skip = 20) {
    return await this.usersRepository.find({
      take: limit,
      skip: skip,
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findBy({
      id: id,
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.usersRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
