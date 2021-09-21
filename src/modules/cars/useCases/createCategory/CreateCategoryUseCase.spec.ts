import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoriesInMemory } from "../../infra/typeorm/repositories/implementations/in-memory/CategoriesRepositoriesInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoriesInMemory: CategoriesRepositoriesInMemory;

describe("Create category", () => {

    beforeEach(() => {
        categoriesRepositoriesInMemory = new CategoriesRepositoriesInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoriesInMemory);

    })

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description test",
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoriesInMemory.findByName(
            category.name
        )

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a category already exists", async () => {
        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description test",
            }
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});