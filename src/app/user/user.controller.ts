import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { IsPublic } from "../decorators/is-public.decorator";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @IsPublic()
    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body)
    }

    @Get(':username')
    async show(@Param('username') username: string) {
        return await this.userService.findByUsername(username)
    }

}

