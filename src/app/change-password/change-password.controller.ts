import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IsPublic } from '../decorators/is-public.decorator';
import { ResetEmailDto } from '../dto/reset-pass-dto';
import { ChangePasswordService } from './change-password.service';

@Controller('change-password')
export class ChangePasswordController{
    constructor(private readonly changePasswordService: ChangePasswordService) { }

    @IsPublic()
    @Post()
    @HttpCode(HttpStatus.OK)
    async att(@Body() body: ResetEmailDto) {
      return this.changePasswordService.changePass(body.token, body.password)
    }
}
