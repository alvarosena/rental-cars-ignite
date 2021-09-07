import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest{
    name: string;
    description: string
}

class CreateSpecificationUseCase{
    constructor(private specificationsRepository: ISpecificationRepository) {}  

    async execute({name, description}: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists) {
            throw new Error("Tha name of this specification already exists(-_-)")
        }

        this.specificationsRepository.create({name, description});
    }
}

export { CreateSpecificationUseCase }