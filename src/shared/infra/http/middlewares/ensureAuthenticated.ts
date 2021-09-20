import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../../../../modules/users/repositories/implementations/UsersRepository";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const { sub: user_id } = verify(token, "a020895d152939969388a634366a69ce") as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exists", 401);
        }
        
        request.user = {
            id: user_id,
        }

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}