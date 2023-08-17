import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Wishlist } from './entities/wishlist.entity';
import { UserProfileResponseDto } from 'src/users/dto/user-profile.dto';
import { AuthUser } from 'src/utils/decorators/user.decorators';

@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wishlist> {
    return this.wishlistsService.findOne(Number(id));
  }

  @Post()
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @AuthUser() user: UserProfileResponseDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @AuthUser() user: UserProfileResponseDto,
  ) {
    return this.wishlistsService.update(Number(id), updateWishlistDto, user.id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @AuthUser() user: UserProfileResponseDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.remove(Number(id), user.id);
  }
}
