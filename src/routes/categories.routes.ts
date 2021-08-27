import { request, response, Router } from 'express';
import multer, { Multer } from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import { importCategoryController } from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

/* Criamos o multer que vai ser o middleware responsavel para fazer
   o upload do arquivo de dentro do isomnia para a aplicação
*/
const upload = multer({
  dest: "./tmp",  
});

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});
                                // Middleware como single
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes }