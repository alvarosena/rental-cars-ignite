import { CarsRepositoryInMemory } from "@modules/cars/infra/typeorm/repositories/implementations/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory(); 
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
    })

    it("Should not be able to create a new specification to a non existent car", async () => {
        expect( async () => {
            const car_id = "123";
            const specifications_id = ["54321"];
    
            await createCarSpecificationUseCase.execute({car_id, specifications_id})
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should be able to create a new specification", async () => {
        const car_id = "123";
        const specifications_id = ["54321"];

        await createCarSpecificationUseCase.execute({car_id, specifications_id})
    })
}); 