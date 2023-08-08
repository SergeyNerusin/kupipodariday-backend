import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsDate } from 'class-validator';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  items: string; //[]???

  @Column()
  image: string; //???

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}

/*
    Cхема списка подарков (wishlist):
    name — название списка. Не может быть длиннее 250 символов и короче одного;
    description — описание подборки, строка до 1500 символов;
    image — обложка для подборки;
    items содержит набор ссылок на подарки.
*/
