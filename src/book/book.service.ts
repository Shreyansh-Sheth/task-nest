import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private BookRepository: Repository<Book>,
    private dataSource: DataSource,
  ) {}

  async create(createBookDto: CreateBookDto, sellerId: number) {
    return await this.BookRepository.save({
      ...createBookDto,
      seller: { id: sellerId },
    });
  }

  async findAll(limit = 10, skip = 0) {
    return await this.BookRepository.find({
      take: limit,
      skip: skip,
    });
  }

  async findOne(id: number) {
    return await this.BookRepository.findBy({
      id: id,
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.BookRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    return await this.BookRepository.delete(id);
  }

  //

  // async buyBook(bookId: number, buyerId: number) {
  //   //remove book points from user
  //   //decrees quantity of it
  //   // add user to buyer list
  //   //do all that in trnasactions

  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();

  //   await queryRunner.startTransaction();

  //   try {
  //     const book = await queryRunner.manager.findOne(Book, {
  //       where: { id: bookId },
  //     });

  //     if (book.quantity <= 0) {
  //       throw new Error('Book is out of stock');
  //     }

  //     const user = await queryRunner.manager.findOne(User, {
  //       where: { id: buyerId },
  //     });

  //     if (user.points < book.points) {
  //       throw new Error('User does not have enough points');
  //     }

  //     user.points -= book.points;
  //     //add new buyer to book

  //     await queryRunner.manager
  //       .createQueryBuilder()
  //       .update(Book)
  //       .relation('buyers')
  //       .of(bookId)
  //       .add(buyerId);
  //     await queryRunner.manager.update(
  //       Book,
  //       { id: bookId },
  //       { quantity: book.quantity - 1 },
  //     );
  //     await queryRunner.manager.update(User, { id: buyerId }, user);
  //     await queryRunner.commitTransaction();
  //     await queryRunner.release();
  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //     await queryRunner.rollbackTransaction();
  //     await queryRunner.release();
  //     return false;
  //   }
  // }

  // async getMyBooks(userId: number) {
  //   return await this.BookRepository.find({
  //     where: { buyers: { id: userId } },
  //   });
  // }
}
