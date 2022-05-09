import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity({ name: 'user' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => TodoEntity, (todo) => todo.user, { eager: true })
    todos: TodoEntity[];
}