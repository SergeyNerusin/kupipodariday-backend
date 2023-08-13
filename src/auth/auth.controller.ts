import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { instanceToPlain } from 'class-transformer';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserSigninDto } from 'src/users/dto/user-profile.dto';

export interface IToken {
  access_token: string;
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Body() user: UserSigninDto): Promise<IToken> {
    console.log('auth.controller.ts login', user);
    return await this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signup(createUserDto);
    // return instanceToPlain(user);
    return user;
  }
}
