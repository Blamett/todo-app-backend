import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IsPublic } from 'src/app/decorators/is-public.decorator';
import { CreateEmailDto } from 'src/app/dto/create-email-dto';
import { PasswordRecoveryService } from './password-recovery.service';


@Controller('forgot-password')
export class PasswordRecoveryController {
  constructor(private readonly nodemailerService: PasswordRecoveryService) { }

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: CreateEmailDto) {
    return this.nodemailerService.recoveryPassword(body.email)
  }


}