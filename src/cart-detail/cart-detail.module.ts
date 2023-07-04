import { Module } from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { CartDetailController } from './cart-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDetail } from './entities/cart-detail.entity';
import { CategoryModule } from 'src/category/category.module';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { CartStoreModule } from 'src/cart-store/cart-store.module';

@Module({
  controllers: [CartDetailController],
  imports: [TypeOrmModule.forFeature([CartDetail]), ProductsModule, CartStoreModule],
  providers: [CartDetailService],
  exports: [TypeOrmModule],
})
export class CartDetailModule {}
