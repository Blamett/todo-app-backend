import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from '../decorators/is-public.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthRequest } from '../models/AuthRequest';
import { CreateEmailDto } from '../dto/create-email-dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

}

