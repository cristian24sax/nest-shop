import { Module } from '@nestjs/common';
import { CartStoreService } from './cart-store.service';
import { CartStoreController } from './cart-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartStore } from './entities/cart-store.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CartStoreController],
  imports: [TypeOrmModule.forFeature([CartStore]), AuthModule],
  providers: [CartStoreService],
  exports: [TypeOrmModule, CartStoreModule, CartStoreService],
})
export class CartStoreModule {}
