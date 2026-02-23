import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<any> {
    return await this.productService.create(createProductDto);
  }
  @Get()
  findAll() {
    return this.productService.findAll();
  }
@Patch(':id')
async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
  return this.productService.update(id, updateProductDto);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

    @Get('by-category')
  async findByCategory(@Query('categoria') categoria: string): Promise<Product[]> {
    return this.productService.findAllByCategory(categoria);
  }
}



