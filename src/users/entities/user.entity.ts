import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/book/entities/book.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @Column()
  role: 'USER' | 'SELLER';

  @Column({
    default: 100,
  })
  points: number;

  @Column({
    nullable: true,
  })
  refreshToken?: string;

  @ApiHideProperty()
  @OneToMany((type) => Book, (Book) => Book.seller)
  books: Book[];

  @ApiHideProperty()
  @OneToMany((type) => Order, (Order) => Order.user)
  purchases: Order[];
}
