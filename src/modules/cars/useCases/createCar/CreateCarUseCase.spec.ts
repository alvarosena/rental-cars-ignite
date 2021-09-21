import { CarsRepositoryInMemory } from "@modules/cars/infra/typeorm/repositories/implementations/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase; 

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Name of car",
            description: "description of car",
            daily_rate: 100,
            license_plate: "ABC-12Y4",
            fine_amount: 60, 
            brand: "Tesla",
            category_id: "Category",
        });
    });

    it("Should not be able to create a car with the same license plate", () => {
        expect( async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "description of car",
                daily_rate: 100,
                license_plate: "ABC-12Y4",
                fine_amount: 60, 
                brand: "Tesla",
                category_id: "Category",
            });

            await createCarUseCase.execute({
                name: "Car2",
                description: "description of car",
                daily_rate: 100,
                license_plate: "ABC-12Y4",
                fine_amount: 60, 
                brand: "Tesla",
                category_id: "Category",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car available",
            description: "description of car",
            daily_rate: 100,
            license_plate: "YU12-12X4",
            fine_amount: 60, 
            brand: "Tesla",
            category_id: "Category",
        });

        expect(car.available).toBe(true);
    });
})