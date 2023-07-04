import { IsNumber, IsString } from 'class-validator';

export class CreateCartDetailDto {
  @IsString({ each: true })
  cartId: string;
  @IsString({ each: true })
  productId: string;
  @IsNumber()
  qty: number;
}
