import { ICarRepository } from "@modules/cars/infra/typeorm/repositories/ICarRepository";
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    name: string,
    description: string,
    daily_rate: number,
    license_plate: string,
    fine_amount: number,
    brand: string,
    category_id: string;
}

@injectable()
class CreateCarUseCase{
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarRepository
    ) {}

    async execute({
        name, 
        description,
        daily_rate, 
        license_plate,
        fine_amount, 
        brand, 
        category_id,
    }: IRequest): Promise<Car> {

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

        if(carAlreadyExists) {
            throw new AppError("This license plate is already taken");
        }

        const car = await this.carsRepository.create({
            name,
            description,
            daily_rate, 
            license_plate,
            fine_amount, 
            brand,
            category_id, 
        });

        return car;
    }
}

export { CreateCarUseCase }