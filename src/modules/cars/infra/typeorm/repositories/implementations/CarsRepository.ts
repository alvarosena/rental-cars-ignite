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
        category_id,
    }: ICarRepositoryDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
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

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuerys = await this.repository
        .createQueryBuilder("c")
        .where("available = :available", { available: true })

        if(brand) {
            carsQuerys.andWhere("c.brand = :brand", { brand })
        }

        if(name) {
            carsQuerys.andWhere("c.name = :name", { name })
        }

        if(category_id) {
            carsQuerys.andWhere("c.category_id = :category_id", { category_id })
        }

        const cars = await carsQuerys.getMany();
        return cars;
    }
}

export { CarsRepository }