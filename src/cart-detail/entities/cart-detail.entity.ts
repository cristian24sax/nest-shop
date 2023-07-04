import { CartStore } from 'src/cart-store/entities/cart-store.entity';
import { Product } from 'src/products/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartDetail {
  @PrimaryGeneratedColumn('uuid')
  cartDetailId: string;

  @ManyToOne(() => CartStore, (cart) => cart.cartDetails)
  @JoinColumn({ name: 'cartId' })
  cart: CartStore;

  @ManyToOne(() => Product, (product) => product.cartdetails, {
    eager: true,
  })
  product: Product;

  @Column()
  qty: number;
}
