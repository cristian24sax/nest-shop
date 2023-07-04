import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/auth/entities/user.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Auth()
  create(@Body() createCategoryDto: CreateCategoryDto, @GetUser() user: User) {
    console.log(createCategoryDto);
    return this.categoryService.create(createCategoryDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoryService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.categoryService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser() user: User,
  ) {
    return this.categoryService.update(id, updateCategoryDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
