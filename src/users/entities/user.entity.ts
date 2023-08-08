import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsEmail, IsDate } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 30)
  username: string;

  @Column()
  @Length(2, 200)
  about: string;

  @Column()
  avatar: string;
  default: 'https://i.pravatar.cc/300';

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  // wishes: string[];
  // offers: string[];
}

/*
    id - уникальный числовой идентификатор. Генерируется автоматически и является первичным ключем каждой из таблиц;
    createdAt - дата создания, тип значения Date;
    updatedAt - дата изменения, тип значения Date.

    Схема пользователя (user):
    username - имя пользователя, уникальная строка от 2 до 30 символов, обязательное поле.
    about - **информация о пользователе, строка от 2 до 200 символов, 
            в качестве значения по умолчанию укажите для него строку: «Пока ничего не рассказал о себе».
    avatar - ссылка на аватар, в качестве значения по умолчанию задайте https://i.pravatar.cc/300
    email - адрес электронной почты пользователя, должен быть уникален.
    password - пароль пользователя, строка.
    wishes - список желаемых подарков. Используйте для него соответствующий тип связи.
    offers - содержит список подарков, на которые скидывается пользователь, 
             установите для него подходящий тип связи.
    wishlists - содержит список вишлистов, которые создал пользовател, 
                установите для него подходящий тип связи.
*/
