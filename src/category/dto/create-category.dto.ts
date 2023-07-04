import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Product } from 'src/products/entities';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'category title (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  name_category: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  products?: string;
}
