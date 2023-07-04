import { User } from 'src/auth/entities/user.entity';
import { CartDetail } from 'src/cart-detail/entities/cart-detail.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartStore {
  @PrimaryGeneratedColumn('uuid')
  idCart: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.cart)
  cartDetails: CartDetail[];
}
