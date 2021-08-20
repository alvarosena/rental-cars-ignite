import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

class ListCategoriesUseCase{
    constructor(private categoriesRepository: ICategoriesRepository) {};

    // : -> this means return something
    execute(){
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase }