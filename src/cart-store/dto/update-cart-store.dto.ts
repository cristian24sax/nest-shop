import { PartialType } from '@nestjs/swagger';
import { CreateCartStoreDto } from './create-cart-store.dto';

export class UpdateCartStoreDto extends PartialType(CreateCartStoreDto) {}
