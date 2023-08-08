import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  raiced: number;

  // owner:  /* ссылка на пользователя, который добавил описание подарка   Один ко многим?*/

  @Column()
  description: string;

  // offers: [] /* массив ссылок на заявки скинуться от других пользователей */

  @Column()
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/*
    Схема для подарков (wish):
    
    id — уникальный числовой идентификатор, 
        генерируется автоматически и является первичным ключем каждой из таблиц;
    name — название подарка. Не может быть длиннее 250 символов и короче одного.
    link — ссылка на интернет-магазин, в котором можно приобрести подарок, строка.
    image - ссылка на изображение подарка, строка, должна быть валидным URL.
    price — стоимость подарка, с округлением до сотых, число.
    raised — сумма предварительного сбора или сумма, 
    которую пользователи сейчас готовы скинуть на подарок, также округляется до сотых.
    owner — ссылка на пользователя, который добавил пожелание подарка.
    description — строка с описанием подарка длиной от 1 и до 1024 символов.
    offers — массив ссылок на заявки скинуться от других пользователей.
    copied — содержит cчётчик тех, кто скопировал подарок себе, целое десятичное число.
    createdAt — дата создания, тип значения Date.
    updatedAt — дата изменения, тип значения Date.
*/
