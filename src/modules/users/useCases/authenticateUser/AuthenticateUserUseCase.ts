import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: {
        name: string,
        email: string,
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRespository: IUsersRepository
    ) {}

    async execute({password, email}: IRequest) {
        const user = await this.usersRespository.findByEmail(email);

        if(!user) {
            throw new Error("Email or password is incorrect!");
        }

        const passwordMatch = compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email or password is incorrect!")
        }

        const token = sign({}, "a020895d152939969388a634366a69ce", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }