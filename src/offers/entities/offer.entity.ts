import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  //user: содержит id желающего скинуться

  @Column()
  item: string;

  @Column()
  hidden: boolean;
  default: false;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/*
  Схема желающих скинуться (offer):
  user содержит id желающего скинуться;
  item содержит ссылку на товар;
  amount — сумма заявки, округляется до двух знаков после запятой;
  hidden — флаг, который определяет показывать ли информацию о скидывающемся в списке. По умолчанию равен false.
*/
