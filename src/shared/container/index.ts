import { container } from "tsyringe";
import { ICategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/ISpecificationRepository";
import { IUsersRepository } from "../../modules/users/infra/typeorm/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/infra/typeorm/repositories/implementations/UsersRepository";
import { ICarRepository } from '@modules/cars/infra/typeorm/repositories/ICarRepository'
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/implementations/CarsRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);


container.registerSingleton<ICarRepository>(
    "CarsRepository",
    CarsRepository
);