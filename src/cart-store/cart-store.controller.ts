import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CartStoreService } from './cart-store.service';
import { CreateCartStoreDto } from './dto/create-cart-store.dto';
import { UpdateCartStoreDto } from './dto/update-cart-store.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('cart-store')
export class CartStoreController {
  constructor(private readonly cartStoreService: CartStoreService) {}

  @Post()
  @Auth()
  create(
    @Body() createCartStoreDto: CreateCartStoreDto,
    @GetUser() user: User,
  ) {
    return this.cartStoreService.create(createCartStoreDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.cartStoreService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.cartStoreService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartStoreDto: UpdateCartStoreDto,
  ) {
    return this.cartStoreService.update(+id, updateCartStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartStoreService.remove(+id);
  }
}
