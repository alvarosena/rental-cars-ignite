import { inject, injectable } from 'tsyringe';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../../infra/typeorm/repositories/ICategoriesRepository'

@injectable()
class ListCategoriesUseCase{
    constructor(
    @inject("CategoriesRepository")    
    private categoriesRepository: ICategoriesRepository) {};

    // : -> this means return something
    async execute(): Promise<Category[]>{
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase }