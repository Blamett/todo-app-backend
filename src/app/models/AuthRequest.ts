import { Request } from "express";
import { UserEntity } from "src/app/entity/user.entity";

export interface AuthRequest extends Request {
    user: UserEntity
}