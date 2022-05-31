import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ChangePasswordService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly userService: UserService, 
        private readonly jwtService: JwtService
    ) { }

    async changePass(token: string, password: string) {

        let { id } = this.jwtService.decode(token) as { id: number };

        const user = await this.userService.findByID(id)

        let newPassword = await bcrypt.hash(password, 10)

        await this.usersRepository.save(this.usersRepository.merge(user, { password: newPassword }))

    }
}
