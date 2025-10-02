import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
@Module({
  controllers: [],
  providers: [],
  imports: [UsersModule, AuthModule, ProductModule],
})
export class AppModule {}
