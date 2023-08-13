import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashValue } from 'src/auth/hash';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async findQuery(query: FindOneOptions<User>) {
    return await this.usersRepository.findOne(query);
  }

  async create(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;

    const existUsername = await this.findQuery({
      where: { username: username },
    });

    if (existUsername) {
      throw new ConflictException(
        `Пользователь с именем ${username} уже существует`,
      );
    }

    const existEmail = await this.findQuery({
      where: { email: email },
    });

    if (existEmail) {
      throw new ConflictException(
        `Пользователь c email: ${email} уже существует`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.usersRepository.save({
      ...createUserDto,
      password: await hashValue(createUserDto.password),
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, username, password } = updateUserDto;
    const user = await this.findById(id);

    if (username) {
      const repositoryUserName = await this.findQuery({
        where: { username: username },
      });

      if (repositoryUserName && repositoryUserName.id !== user.id) {
        throw new ConflictException(
          `Пользователь с именем ${username} уже существует`,
        );
      }
    }

    if (email) {
      const repositoryUser = await this.findQuery({ where: { email: email } });
      if (repositoryUser && repositoryUser.id !== user.id) {
        throw new ConflictException(
          `Пользователь c таким email: ${email} уже существует`,
        );
      }
    }

    if (password) {
      updateUserDto.password = await hashValue(password);
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async getWishes(userName: string): Promise<Wish[]> {
    const user = await this.findQuery({
      where: { username: userName },
      relations: { wishes: true },
    });
    console.log('user.service getWishes():', user);
    if (!user) throw new BadRequestException(`Пользователя c ${userName} нет`);

    return user.wishes;
  }

  async getUserByName(userName: string) {
    const user = await this.findQuery({ where: { username: userName } });

    if (!user) throw new BadRequestException(`Пользователя c ${userName} нет`);

    return user;
  }

  find(query: string) {
    return this.findQuery({
      where: [{ username: query }, { email: query }],
    });
  }
}
