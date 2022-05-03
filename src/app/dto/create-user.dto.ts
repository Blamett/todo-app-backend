import { IsNotEmpty, IsNotIn, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserService } from "../user.service";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'password too weak',
    })
    password: string;
}