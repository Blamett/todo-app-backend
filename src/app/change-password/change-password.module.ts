import { Controller, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/app/user/user.module';
import { ChangePasswordService } from './change-password.service';
import { JwtModule } from '@nestjs/jwt';
import { ChangePasswordController } from './change-password.controller';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config'
require('dotenv').config()


@Module({
  imports: [UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' }
  })
],
  providers: [ChangePasswordService],
  controllers: [ChangePasswordController],
})
export class ChangePasswordModule {}
