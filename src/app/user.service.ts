import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async findOneOrFail(id: number) {
        try{
            return this.usersRepository.findOneOrFail(id)
        }
        catch(error){
            throw new NotFoundException(error.message);
        }
    }
    async create(data: CreateUserDto) {
        return await this.usersRepository.save(this.usersRepository.create(data))
    }
    
}