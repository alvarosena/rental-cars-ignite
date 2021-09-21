import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarRepositoryDTO{
    name: string,
    description: string,
    daily_rate: number,
    license_plate: string,
    fine_amount: number,
    brand: string,
    category_id: string;
}

interface ICarRepository{
    create(data: ICarRepositoryDTO): Promise<Car>

    findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarRepositoryDTO, ICarRepository }