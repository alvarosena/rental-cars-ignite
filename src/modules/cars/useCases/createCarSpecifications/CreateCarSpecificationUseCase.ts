import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/infra/typeorm/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/infra/typeorm/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string,
    specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarRepository,

        @inject("SpecificationRepository")
        private specifcationsRepository: ISpecificationRepository
    ) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError("Car does not exists");
        }

        const specifications = await this.specifcationsRepository.findByIds(
            specifications_id,
        )

        carExists.specifications = specifications;

        await this.carsRepository.create(carExists);

        return carExists;
    }
}

export { CreateCarSpecificationUseCase }