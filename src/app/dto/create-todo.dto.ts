import { IsIn, IsInt, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { UserEntity } from "../entity/user.entity";

export class CreateTodoDto {
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(62)
    task: string;

    @IsNotEmpty()
    @IsIn([0, 1])
    isDone: number;

    user: UserEntity;

    @IsInt()
    @IsOptional()
    currentPosition: number;
}