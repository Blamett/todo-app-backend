import { ExecutionContext, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { userInfo } from "os";
import { Repository } from "typeorm";
import { CurrentUser } from "./decorators/current-user.decorator";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoEntity } from "./entity/todo.entity";
import { UserEntity } from "./entity/user.entity";

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) { }

    async findAll(id: number) {

        return await this.todoRepository.find({ where: { user: { id } }, order:{createdAt: -1} })
    }

    async findOneOrFail(id: string) {
        try {
            return await this.todoRepository.findOneOrFail(id)
        }
        catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data: CreateTodoDto, user: UserEntity) {
        data.user = user;
        return await this.todoRepository.save(this.todoRepository.create(data))
    }

    async update(id: string, data: Partial<UpdateTodoDto>,  user: UserEntity) {
        const todo = await this.findOneOrFail(id);
        data.user = user;

        this.todoRepository.merge(todo, data);
        return await this.todoRepository.save(todo)
    }

    async deletById(id: string) {
        await this.findOneOrFail(id)

        await this.todoRepository.softDelete(id)
    }
}