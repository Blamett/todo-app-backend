import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { TodoEntity } from "../entity/todo.entity";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) { }

    async findAll(id: number, page?: number, limit?: number) {

        page = page ?? 1;

        limit = limit ?? 12;

        const offset = page * limit

        const [todos, count] = await this.todoRepository.findAndCount({
            where: { user: { id } },
            order: { currentPosition: 1 },
            skip: offset,
            take: limit,
        });

        return {
            todos,
            count
        }

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
        data.currentPosition = 0;

        await this.todoRepository.query(`
            UPDATE todos
               SET current_position = current_position + 1 
             WHERE userId = ${user.id}
               AND deleted_at IS NULL;
        `);

        return await this.todoRepository.save(this.todoRepository.create(data))
    }

    async update(id: string, data: Partial<UpdateTodoDto>, user: UserEntity) {
        const todo = await this.findOneOrFail(id);
        data.user = user;

        this.todoRepository.merge(todo, data);
        return await this.todoRepository.save(todo)
    }

    async deletById(id: string, user: UserEntity) {
        const todo = await this.findOneOrFail(id)

        await this.todoRepository.query(`
        UPDATE todos
           SET current_position = current_position - 1 
        WHERE 
            current_position > ${todo.currentPosition}

            AND

            userId = ${user.id}
            
            AND deleted_at IS NULL;
        `);

        await this.todoRepository.softDelete(todo.id)
    }

    async currentOrder(previousIndex: number, currentIndex: number, userId: number) {

        const naoFacamIssoEmCasaCriancas = await this.findAll(userId);
        const arr = naoFacamIssoEmCasaCriancas.todos;

        const todoMovido = arr.find(todo => todo.currentPosition === previousIndex);

        if (currentIndex < previousIndex) {

            const todosInc1 = arr.filter(todo => todo.currentPosition >= currentIndex && todo.currentPosition < previousIndex);
            todosInc1.forEach(each => each.currentPosition++);
            await this.todoRepository.save(todosInc1);

        } else if (currentIndex > previousIndex) {

            const todosDec1 = arr.filter(todo => todo.currentPosition <= currentIndex && todo.currentPosition > previousIndex);
            todosDec1.forEach(each => each.currentPosition--);
            await this.todoRepository.save(todosDec1);

        }

        todoMovido.currentPosition = currentIndex;
        return await this.todoRepository.save(todoMovido);
    }
}