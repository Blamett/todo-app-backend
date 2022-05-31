import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entity/user.entity";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async findOneOrFail(id: number) {
        try {
            return this.usersRepository.findOneOrFail(id)
        }
        catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const data = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        };

        const createdUser = await this.usersRepository.save(this.usersRepository.create(data))

        return {
            ...createdUser,
            password: undefined,
        };
    }

    async findByUsername(username: string) {
        return this.usersRepository.findOneOrFail({ username });
    }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({ email });
    }

    async findByID(id: number) {
        return this.usersRepository.findOne(id)
    }
}