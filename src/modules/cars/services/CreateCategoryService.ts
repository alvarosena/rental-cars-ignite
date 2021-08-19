import { ICategoriesRepository } from "../repositories/ICategoriesRepository"

// DTO -> Data transfer object 
interface IRequest{
    name: string;
    description: string;
}

class CreateCategoryService{
    constructor(private categoriesRepository: ICategoriesRepository) {};

    // : -> this means return something
    execute({ name, description }: IRequest): void{
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new Error("Category already exists");
        } 

        this.categoriesRepository.create({name, description});
    };
}

export { CreateCategoryService }