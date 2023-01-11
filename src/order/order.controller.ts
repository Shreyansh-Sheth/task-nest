import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { HasRoles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { Request } from 'express';
import { CancelOrderDto } from './dto/cancle-order.dto';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @HasRoles('USER')
  @UseGuards(AccessTokenGuard, RolesGuard)
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.orderService.createOrder(
      createOrderDto.bookId,
      createOrderDto.quantity,
      req.user['sub'],
    );
  }

  @Get()
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @HasRoles('USER')
  @UseGuards(AccessTokenGuard, RolesGuard)
  getMyOrders(@Req() req: Request) {
    return this.orderService.getMyOrders(req.user['sub']);
  }

  @Post('cancel')
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @HasRoles('USER')
  @UseGuards(AccessTokenGuard, RolesGuard)
  cancel(@Body() cancelOrderDto: CancelOrderDto, @Req() req: Request) {
    return this.orderService.cancelOrder(
      cancelOrderDto.orderId,
      req.user['sub'],
    );
  }
}
