import { AppError } from "../../../../shared/errors/AppError";
import { SpecificationRepositoryInMemory } from "../../infra/typeorm/repositories/implementations/in-memory/SpecificationRepositoryInMemory";
import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create specification", () => {

    beforeEach(() => {
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepositoryInMemory);
    })

    it("Should be able to create a specification", async () => {
        const specification = {
            name: "Specification test",
            description: "Test create specification"
        }

        await createSpecificationUseCase.execute({
            name: specification.name,
            description: specification.description,
        })

        const specificationCreated = await specificationRepositoryInMemory.findByName(
            specification.name,
        )
        
        expect(specificationCreated).toHaveProperty("id");
    });

    it("Should not be able to create a specification alredy exists", async () => {
        expect(async () => {
            const specification = {
                name: "Specification test",
                description: "Test create specification"
            }
    
            await createSpecificationUseCase.execute({
                name: specification.name,
                description: specification.description,
            })
            
            await createSpecificationUseCase.execute({
                name: specification.name,
                description: specification.description,
            });  
        }).rejects.toBeInstanceOf(AppError);
    });
});