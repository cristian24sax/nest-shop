import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { CartDetail } from './entities/cart-detail.entity';
import { Product } from 'src/products/entities';
import { CartStoreService } from 'src/cart-store/cart-store.service';
import { CartStore } from 'src/cart-store/entities/cart-store.entity';

@Injectable()
export class CartDetailService {
  constructor(
    @InjectRepository(CartDetail)
    private readonly repositoryDetail: Repository<CartDetail>,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(CartStoreService)
    private readonly cartStoreService: CartStoreService,
  ) {}
  async create(createCartDetailDto: CreateCartDetailDto) {
    const { cartId, productId, ...rest } = createCartDetailDto;

    let products: Product;
    let cartStore: CartStore;

    products = await this.productsService.findOne(productId);
    cartStore = await this.cartStoreService.findOne(cartId);

    if (rest.qty > products.stock)
      throw new NotFoundException(`quantity exceed stock`);

    const cartDetail = await this.repositoryDetail.create({
      cart: cartStore,
      product: products,
      ...rest,
    });
    
    await this.repositoryDetail.save(cartDetail);

    return {
      ...products,
      cartStore,
    };
  }

  findAll() {
    return `This action returns all cartDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartDetail`;
  }

  update(id: number, updateCartDetailDto: UpdateCartDetailDto) {
    return `This action updates a #${id} cartDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartDetail`;
  }
}
