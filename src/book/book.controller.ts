import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Query, Req } from '@nestjs/common/decorators';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { HasRoles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { BookService } from './book.service';
import { BuyBookDto } from './dto/buy-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @HasRoles('SELLER')
  @UseGuards(AccessTokenGuard, RolesGuard)
  async create(@Body() createBookDto: CreateBookDto, @Req() req: Request) {
    return await this.bookService.create(
      createBookDto,
      Number(req.user['sub']),
    );
  }

  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiOkResponse({
    type: Book,
  })
  findAll(@Query('limit') limit?: number, @Query('skip') skip?: number) {
    return this.bookService.findAll(limit, skip);
  }

  @Post('buy-book')
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @HasRoles('USER')
  @UseGuards(AccessTokenGuard, RolesGuard)
  buyBook(@Body() buyBookDto: BuyBookDto, @Req() req: Request) {
    const res = this.bookService.buyBook(buyBookDto.bookId, req.user['sub']);
    if (!res) {
      throw new InternalServerErrorException();
    }
  }

  @Get('my-books')
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @HasRoles('USER')
  @UseGuards(AccessTokenGuard, RolesGuard)
  getMyBooks(@Req() req: Request) {
    return this.bookService.getMyBooks(req.user['sub']);
  }
}
