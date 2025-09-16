import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly clientProduct: ClientProxy
  ) {}

  @Post()
  createProduct() {
    return { message: 'Product created' };
  }

  @Get()
  findAllProducts() {
    return this.clientProduct.send({ cmd: 'find_all_products' }, {}); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { message: `Product retrieved with id ${id}` };  
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return { message: `Product with id ${id} deleted` };
  }

  @Patch(':id')
  patchProduct(
    @Param('id') id: string,
    @Body() body: any
  ) {
    return { message: `Product with id ${id} updated`, data: body };
  }



}
