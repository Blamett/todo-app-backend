import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./entity/todo.entity";
import { UsersEntity } from "./entity/todo.entity";
import { TodoController, UsersController } from "./todo.controller"
import { TodoService, UsersService } from "./todo.service"

@Module({
    imports: [TypeOrmModule .forFeature([TodoEntity, UsersEntity])],
    controllers: [TodoController, UsersController],
    providers: [TodoService, UsersService],
    exports: [TodoService, UsersService],
})
export class TodoModule{}