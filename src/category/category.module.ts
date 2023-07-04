import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    AuthModule,
    forwardRef(()=>ProductsModule),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
