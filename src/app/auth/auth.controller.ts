import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post, UseGuards
} from '@nestjs/common';
import { IsPublic } from '../decorators/is-public.decorator';
import { UserEntity } from '../entity/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body('user') user: UserEntity) {
    return this.authService.login(user);
  }
}