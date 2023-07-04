import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/products/entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id_category: string;

  @Column('text', {
    unique: true,
  })
  name_category: string;

  @Column('text')
  description: string;

  // @Column('text')
  // created: Timestamp;

  // @Column('text')
  // update: Timestamp;

  @ManyToOne(() => User, (user) => user.categories, {
    eager: true,
  })
  user: User;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
    eager: true,
  })
  products?: Product[];
}
