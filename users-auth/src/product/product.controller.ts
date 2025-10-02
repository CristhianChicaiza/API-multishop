import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<any> {
    return await this.ProductService.create(createProductDto);
  }
  @Get()
  findAll() {
    return this.ProductService.findAll();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductService.remove(id);
  }
}
