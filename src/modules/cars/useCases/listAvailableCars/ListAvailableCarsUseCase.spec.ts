import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsRepositoryInMemory } 
from '@modules/cars/infra/typeorm/repositories/implementations/in-memory/CarsRepositoryInMemory';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "CAR1",
            description: "Cars description",
            daily_rate: 100,
            license_plate: "AVX-0AN7",
            fine_amount: 40,
            brand: "Car1 Brand",
            category_id: "ba3766be-9f15-4d44-9741-81b20ed1fb49"
        })

        const cars = await listAvailableCarsUseCase.execute({});
        
        expect(cars).toEqual([car]);
    })

    it("Should be able to list all available cars by the name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "CAR2",
            description: "Cars description",
            daily_rate: 100,
            license_plate: "AVX-0AN7",
            fine_amount: 40,
            brand: "Brand",
            category_id: "ba3766be-9f15-4d44-9741-81b20ed1fb49"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Brand",
        });

        console.log(cars);
        
        expect(cars).toEqual([car]);
    })
}); 