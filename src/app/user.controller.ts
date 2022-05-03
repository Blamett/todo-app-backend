import { Body, Controller, Get, Param, Post} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";


@Controller('api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body)
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return await this.userService.findOneOrFail(id)
    }

}