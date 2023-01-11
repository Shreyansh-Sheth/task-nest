import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  points: number;

  @Column()
  quantity: number;

  @Column()
  image: string;

  @ManyToOne((type) => User, (User) => User.books)
  @ApiHideProperty()
  seller: User;

  @OneToMany((type) => Order, (Order) => Order.book)
  @ApiHideProperty()
  orders: Order[];
}
