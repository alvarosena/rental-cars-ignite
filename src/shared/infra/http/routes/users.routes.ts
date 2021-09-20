import { request, response, Router } from "express";
import multer from "multer";
import { CreateUserUseController } from "../../../../modules/users/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from  '../../../../config/upload';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserUseController = new CreateUserUseController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserUseController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle);

export { usersRoutes }