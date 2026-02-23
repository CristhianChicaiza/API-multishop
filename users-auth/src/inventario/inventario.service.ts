import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      const product = await this.prisma.product.create({
        data: {
          codigo: data.codigo,
          image: data.image,
          prenda: data.prenda,
          marca: data.marca,
          categoria: data.categoria,
          precio: data.precio,
          cantidad: data.cantidad,
        },
      });

      console.log('✅ Producto guardado:', product);
      return product;
    } catch (error) {
      console.error('❌ Error al guardar producto:', error);
      throw error;
    }
  }
}
