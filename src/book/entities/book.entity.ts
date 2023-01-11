import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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

  @ManyToMany((type) => User)
  @JoinTable()
  buyers: User[];
}
