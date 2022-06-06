import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class OrderTodoDto {

    @IsNotEmpty()
    @IsNumber()
    previousIndex: number

    @IsNotEmpty()
    @IsNumber()
    currentIndex: number
}