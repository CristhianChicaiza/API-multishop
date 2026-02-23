import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { InventarioModule } from './inventario/inventario.module';

import { PrismaModule } from './prisma/prisma.module';
@Module({
  controllers: [],
  providers: [],
  imports: [
    PrismaModule,
    UsersModule, 
    AuthModule, 
    ProductModule, 
    InventarioModule],
})
export class AppModule {}
