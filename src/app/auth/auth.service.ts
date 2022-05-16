import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user.service';
import { UserPayload } from '../models/UserPayload';
import { UserToken } from '../models/UserToke';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async login(user: UserEntity): Promise<UserToken> {
        
        const payload: UserPayload = {
            sub: user.id,
            username: user.username
        };

        return{
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);

        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(isPasswordValid){
                return {
                    ...user,
                    password: undefined,
                }
            }
        }

        // nao encontrou user / password n corresponde
        throw new Error('Email address or password provided is incorrect')
    }
}
