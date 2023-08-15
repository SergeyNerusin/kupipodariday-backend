import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from './hash';
import { SignupUserDto } from './dto/signup-user.dto';
import {
  UserProfileResponseDto,
  UserSigninDto,
} from 'src/users/dto/user-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: SignupUserDto): Promise<UserProfileResponseDto> {
    return this.usersService.create(createUserDto);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findDataUser({
      select: { username: true, password: true, id: true },
      where: { username },
    });

    if (user && (await compareHash(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      console.log('auth.servise.ts validate', result);
      return result;
    }
    return null;
  }

  async login(user: UserSigninDto) {
    const { username, id: sub } = user;
    const token = await this.jwtService.signAsync({ username, sub });
    console.log('token:', token);
    return {
      access_token: token,
    };
  }
}
