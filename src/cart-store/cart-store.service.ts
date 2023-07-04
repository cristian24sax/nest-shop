import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartStoreDto } from './dto/create-cart-store.dto';
import { UpdateCartStoreDto } from './dto/update-cart-store.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartStore } from './entities/cart-store.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CartStoreService {
  constructor(
    @InjectRepository(CartStore)
    private readonly repositoryCartStore: Repository<CartStore>,
  ) {}

  async create(createCartStoreDto: CreateCartStoreDto, user: User) {
    const cartStore = await this.repositoryCartStore.create({
      ...createCartStoreDto,
      user,
    });
    // console.log(cartStore);
    // if (cartStore.user) throw new ConflictException('El usuario ya existe');

    await this.repositoryCartStore.save(cartStore);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const carts = await this.repositoryCartStore.find({
      take: limit,
      skip: offset,
      relations: {
        user: true,
        cartDetails: true,
      },
    });

    return carts;
  }

  async findOne(term: string) {
    let cart: CartStore;

    if (isUUID(term)) {
      cart = await this.repositoryCartStore.findOneBy({ idCart: term });
    } else {
      const queryBuilder = this.repositoryCartStore.createQueryBuilder('prod');
      cart = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .leftJoinAndSelect('prod.category', 'prodCategory')
        .getOne();
    }

    if (!cart) throw new NotFoundException(`cart with ${term} not found`);
    delete cart.user;
    return cart;
  }

  update(id: number, updateCartStoreDto: UpdateCartStoreDto) {
    return `This action updates a #${id} cartStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartStore`;
  }
}
