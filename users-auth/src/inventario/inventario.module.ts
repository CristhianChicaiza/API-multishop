// src/inventario/inventario.module.ts
import { Module } from '@nestjs/common';
import { InventarioController } from './inventario.controller';
import { ProductService } from '../product/product.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventarioController], // 👈 Aquí va tu controlador de prendas (subida CSV)
  providers: [ProductService],
})
export class InventarioModule {}
