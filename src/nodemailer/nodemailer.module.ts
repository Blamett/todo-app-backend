import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/app/auth/auth.service';
import { UserEntity } from 'src/app/entity/user.entity';
import { UserModule } from 'src/app/user.module';
import { NodemailerController } from './nodemailer.controller';
import { NodemailerService } from './nodemailer.service';

@Module({
    controllers: [NodemailerController],
    providers: [NodemailerService,],
    imports:[UserModule, TypeOrmModule .forFeature([UserEntity])]
})
export class NodemailerModule {}
