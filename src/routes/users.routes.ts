import { request, response, Router } from "express";
import { CreateUserUseController } from "../modules/users/useCases/CreateUserController";

const usersRoutes = Router();

const createUserUseController = new CreateUserUseController();

usersRoutes.post("/", createUserUseController.handle);

export { usersRoutes }