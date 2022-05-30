import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/app/entity/user.entity';
import { UserModule } from 'src/app/user/user.module';
import { NodemailerController } from './password-recovery.controller';
import { NodemailerService } from './password-recovery.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [NodemailerController],
    providers: [NodemailerService],
    imports: [UserModule, TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' }
    })]
})
export class NodemailerModule { }
