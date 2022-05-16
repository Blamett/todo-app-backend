import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from '../decorators/is-public.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthRequest } from '../models/AuthRequest';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @IsPublic()
  // @UseGuards(LocalAuthGuard)
  // @Post()
  // @HttpCode(HttpStatus.OK)
  // async login(@Body('user') user: UserEntity) {
  //   return this.authService.login(user);
  // }

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}