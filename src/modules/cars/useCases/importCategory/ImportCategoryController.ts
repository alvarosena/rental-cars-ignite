import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { container } from 'tsyringe';
class ImportCategoryController{

    handle(request: Request, response: Response): Response{
        const { file } = request;

        const importCategoryUseCase = container.resolve(ImportCategoryController);

        importCategoryUseCase.execute(file)

        return response.send();
    }
}

export { ImportCategoryController }