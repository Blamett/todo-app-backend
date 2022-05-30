import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "../entity/todo.entity";
import { UserEntity } from "../entity/user.entity";
import { TodoController} from "./todo.controller"
import { TodoService} from "./todo.service"
import {UserController } from "../user/user.controller"
import {UserService } from "../user/user.service"

@Module({
    imports: [TypeOrmModule .forFeature([TodoEntity, UserEntity])],
    controllers: [TodoController, UserController],
    providers: [TodoService, UserService],
    exports: [TodoService, UserService],
})
export class TodoModule{}