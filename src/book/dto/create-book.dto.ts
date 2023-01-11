import { MinLength, Min } from 'class-validator';
export class CreateBookDto {
  @MinLength(2)
  name: string;

  @Min(1)
  points: number;

  @Min(1)
  quantity: number;

  image: string;
}
