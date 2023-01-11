import { MinLength, Min } from 'class-validator';
export class CreateOrderDto {
  bookId: number;

  @Min(1)
  quantity: number;
}
