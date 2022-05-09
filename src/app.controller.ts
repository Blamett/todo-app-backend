import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './app/decorators/current-user.decorator';
import { IsPublic } from './app/decorators/is-public.decorator';
import { UserEntity } from './app/entity/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get(':me')
  getMe(@CurrentUser() user: UserEntity){
    return user
  }
}
