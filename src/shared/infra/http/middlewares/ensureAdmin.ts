import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/implementations/UsersRepository';
import { usersRoutes } from '../routes/users.routes';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    
    const user = await usersRepository.findById(id);

    if(!user.isAdmin) {
        throw new AppError("Users isn't admin!")
    }

    return next();
}
