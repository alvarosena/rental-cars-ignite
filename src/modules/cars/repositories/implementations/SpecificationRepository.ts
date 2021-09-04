import { Specification } from "../../entities/Specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository{

    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    
    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            createAt: new Date(),
        });
        
        this.specifications.push(specification);
    }
    
    findByName(name: string): Specification {
        const specification = this.specifications.find(
            (specification) => specification.name === name);
        return specification;
    }

    list(): Specification[]{
        return this.specifications;
    }
}

export { SpecificationRepository }
