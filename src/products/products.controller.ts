import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return { message: 'Product created' };
  }

  @Get()
  findAllProducts() {
    return { message: 'Products retrieved' };
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
