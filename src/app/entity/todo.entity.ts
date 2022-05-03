import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name: 'todos'})
export class TodoEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    task: string;

    @Column({ name: 'is_done', type: 'tinyint', width: 1})
    isDone: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @ManyToOne(() => UserEntity, (user) => user.todos)
    user: UserEntity
}
