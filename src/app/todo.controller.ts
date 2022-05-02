import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoService } from "./todo.service";

import { UsersService } from "./todo.service";
import { CreateUserDto } from "./dto/create-todo.dto";

@Controller('api/v1/todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async index() {
        return await this.todoService.findAll()
    }

    @Post()
    async create(@Body() body: CreateTodoDto) {
        return await this.todoService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOneOrFail(id)
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto) {
        return await this.todoService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.todoService.deletById(id)
    }
}

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body)
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return await this.userService.findOneOrFail(id)
    }

}