import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { Product } from 'src/products/entities';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger('CategoryService');

  constructor(
    @InjectRepository(Category)
    private readonly repositoryCategory: Repository<Category>,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @InjectRepository(Product)
    private readonly repositoryProduct: Repository<Product>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, user: User) {
    let product: Product;
    const { products, ...rest } = createCategoryDto;

    if (products) product = await this.productsService.findOne(products);
    try {
      const category = await this.repositoryCategory.create({
        ...rest,
        user,
      });

      await this.repositoryCategory.save(category);
      await this.repositoryProduct.update(product.id, { category: category });
      return category;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const categories = await this.repositoryCategory.find({
      take: limit,
      skip: offset,
      relations: {
        user: true,
        products: true,
      },
    });

    return categories;
  }

  async findOne(term: string) {
    let category: Category;
    if (isUUID(term)) {
      category = await this.repositoryCategory.findOneBy({ id_category: term });
    } else {
      const queryBuilder = this.repositoryCategory.createQueryBuilder('cate');
      category = await queryBuilder
        .where('UPPER(name_category)=:name_category', {
          name_category: term.toUpperCase(),
        })
        .leftJoinAndSelect('cate.products', 'categoryProduct')
        .getOne();
    }
    if (!category)
      throw new NotFoundException(`category with ${term} not found`);
    delete category.user;
    return category;
  }
  //pendiente
  async update(id: string, updateCategoryDto: UpdateCategoryDto, user) {
    let product: Product;
    const { products, ...toupdate } = updateCategoryDto;
    const categoryUpdate = await this.findOne(id);
    if (products) {
      product = await this.productsService.findOne(products);
      categoryUpdate.products = [...categoryUpdate.products, product];
    }
    const category = await this.repositoryCategory.preload({
      id_category: id,
      ...categoryUpdate,
      ...toupdate,
    });

    await this.repositoryCategory.save(category);
    return category;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.repositoryCategory.remove(product);
  }
  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
