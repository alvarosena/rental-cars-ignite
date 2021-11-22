import { ICarRepository, ICarRepositoryDTO } from "../../ICarRepository";
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { getTokenSourceMapRange } from "typescript";

class CarsRepositoryInMemory implements ICarRepository{
    cars: Car[] = [];

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICarRepositoryDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string,
        ): Promise<Car[]> {
        const cars = this.cars
        .filter(car => {
            if(car.available === true || ((brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) || 
                name && car.name === name)) {
                    return car;
            }
        })
        
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = this.cars.find(car => car.id === id);
        return car;
    }
}   

export { CarsRepositoryInMemory }