import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/implementations/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { AppError } from "../../../../errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "00123",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a non existent user", () => {
        expect( async () => {
            await authenticateUserUseCase.execute({
                email: "false@test.com",
                password: "123",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be not be able to authenticate with incorrect password", () => {
        expect( async () => {
            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "user@user.com",
                password: "1234",
                name: "User test", 
            }

            await createUserUseCase.execute(user); 

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "adadadad",
            })
        }).rejects.toBeInstanceOf(AppError);
    });
});