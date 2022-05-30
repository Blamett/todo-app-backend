import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/app/entity/user.entity';
import { UserModule } from 'src/app/user/user.module';
import { NodemailerController } from './password-recovery.controller';
import { NodemailerService } from './password-recovery.service';

@Module({
    controllers: [NodemailerController],
    providers: [NodemailerService,],
    imports: [UserModule, TypeOrmModule.forFeature([UserEntity])]
})
export class NodemailerModule { }
