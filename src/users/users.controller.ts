import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/utils/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { FindUserDto } from './dto/find-user.dto';
import {
  UserProfileResponseDto,
  UserPublicProfileResponseDto,
} from './dto/user-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOwn(@AuthUser() user: User): Promise<UserProfileResponseDto> {
    return this.usersService.findDataUser({
      where: { id: user.id },
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Patch('me')
  update(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserPublicProfileResponseDto> {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Get('me/wishes')
  getMyWishes(@AuthUser() user: User) {
    return this.usersService.getWishes(user.username);
  }

  @Get(':username')
  getusername(@Param('username') username: string) {
    return this.usersService.getUserByName(username);
  }

  @Get(':username/wishes')
  getuserwihes(@Param('username') username: string) {
    return this.usersService.getWishes(username);
  }

  @Post('find')
  async find(@Body() findUsertDto: FindUserDto): Promise<User> {
    const { query } = findUsertDto;
    return await this.usersService.find(query);
  }
}
