import { Controller, Get, Post, Body, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { CreateOrderDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
      @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
    ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id })
      );

      return order;

    } catch (error) {
      throw new RpcException(error);
    }
  }
  
}
