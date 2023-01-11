import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/book/entities/book.entity';
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
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Book, (Book) => Book.orders)
  book: Book;

  @ManyToOne((type) => User, (User) => User.purchases)
  user: User;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';

  @Column()
  quantity: number;

  @Column()
  points: number;
}
