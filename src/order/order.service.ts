import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
  ) {}

  async createOrder(bookId: number, quantity: number, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const book = await queryRunner.manager.findOne(Book, {
        where: { id: bookId },
      });

      const user = await queryRunner.manager.findOne(User, {
        where: {
          id: userId,
        },
      });
      if (book.quantity < quantity) {
        throw new Error('No more books left');
      }

      if (user.points < book.points * quantity) {
        throw new Error('Not enough points');
      }
      user.points -= book.points * quantity;

      queryRunner.manager.save(
        queryRunner.manager.create(Order, {
          book: book,
          user: user,
          points: book.points * quantity,
          quantity: quantity,
        }),
      );

      await queryRunner.manager.update(
        Book,
        { id: bookId },
        { quantity: book.quantity - quantity },
      );
      await queryRunner.manager.update(User, { id: userId }, user);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return true;
    } catch {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return false;
    }
  }

  async getMyOrders(userId: number) {
    return await this.OrderRepository.find({
      where: { user: { id: userId } },
    });
  }

  async cancelOrder(orderId: number, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.findOne(Order, {
        where: { id: orderId },
        relations: ['book', 'user'],
      });

      if (order.status !== 'PENDING') {
        throw new Error('Order is not pending');
      }
      const user = await queryRunner.manager.findOne(User, {
        where: {
          id: userId,
        },
      });

      if (user.id !== order.user.id) {
        throw new Error('Order does not belong to user');
      }

      user.points += order.points;

      await queryRunner.manager.update(
        Book,
        { id: order.book.id },
        { quantity: order.book.quantity + order.quantity },
      );
      await queryRunner.manager.update(User, { id: userId }, user);

      await queryRunner.manager.update(
        Order,
        { id: orderId },
        { status: 'CANCELLED' },
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return true;
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return false;
    }
  }
}
