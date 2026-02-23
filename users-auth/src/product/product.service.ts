import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  createMany(results: never[]) {
    throw new Error('Method not implemented.');
  }

 constructor(private readonly prisma: PrismaService) {}

    async saveProducts(products: any[]): Promise<Product[]> {
    const savedProducts: Product[] = [];

    for (const product of products) {
      try {
        const saved: Product= await this.prisma.product.create({
          data: {
            codigo: product.codigo,
            image: product.image,
            prenda: product.prenda,
            marca: product.marca,
            categoria: product.categoria,
            precio: parseInt(product.precio),
            cantidad: parseInt(product.cantidad),
          },
        });

        savedProducts.push(saved);
      } catch (error) {
        console.error(`Error al guardar producto ${product.codigo}:`, error.message);
      }
    }

    return savedProducts;
  }

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  // findOne(id: string) {
  //   return this.prisma.product.findUnique({ where: { id } });
  // }

async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
  const existing = await this.prisma.product.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }
  return this.prisma.product.update({
    where: { id },
    data: updateProductDto,
  });
}

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

  async findAllByCategory(categoria: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { categoria: { equals: categoria, mode: 'insensitive' } },
    });
  }
}
