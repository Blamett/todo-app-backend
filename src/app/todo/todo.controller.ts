import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put } from "@nestjs/common";
import { CurrentUser } from "../decorators/current-user.decorator";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { UserEntity } from "../entity/user.entity";
import { TodoService } from "./todo.service";

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async index(@CurrentUser() user: UserEntity) {
        return await this.todoService.findAll(user.id)

    }

    @Post()
    async create(@Body() body: CreateTodoDto, @CurrentUser() user: UserEntity) {
        return await this.todoService.create(body, user)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOneOrFail(id)
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto, @CurrentUser() user: UserEntity) {
        return await this.todoService.update(id, body, user)
    }

    @Patch(':id')
    async patch(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: Partial<UpdateTodoDto>, @CurrentUser() user: UserEntity) {
        return await this.todoService.update(id, body, user)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.todoService.deletById(id)
    }
}
