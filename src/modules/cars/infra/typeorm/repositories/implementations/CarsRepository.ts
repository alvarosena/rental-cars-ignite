import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { getRepository, Repository } from "typeorm"
import { ICarRepository } from "../ICarRepository";
import { ICarRepositoryDTO } from "../ICarRepository";

class CarsRepository implements ICarRepository{
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
    }: ICarRepositoryDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
        })

        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        })

        return car;
    }
}

export { CarsRepository }