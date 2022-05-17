import { IsIn, IsNotEmpty } from "class-validator";
import { UserEntity } from "../entity/user.entity";

export class CreateTodoDto {
    @IsNotEmpty()
    task: string;

    @IsNotEmpty()
    @IsIn([0, 1])
    isDone: number;

    user: UserEntity;
}