import { v4 } from "uuid";
import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoriesInMemory } from "../../infra/typeorm/repositories/implementations/in-memory/CategoriesRepositoriesInMemory";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let listCategoriesUseCase: ListCategoriesUseCase
let categoriesRepositoriesInMemory: CategoriesRepositoriesInMemory;

describe("List Categories", () => {
    beforeEach(() => {
        categoriesRepositoriesInMemory = new CategoriesRepositoriesInMemory()
        listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositoriesInMemory);
    }) 

    it("Should be able to list all categories", async () => {

        await listCategoriesUseCase.execute();

        const categories = await categoriesRepositoriesInMemory.list()
        return categories;
    })

    it("Should not be able to list a non exists category", async () => {
        expect(() => {
            listCategoriesUseCase.execute();
        })
    });
});