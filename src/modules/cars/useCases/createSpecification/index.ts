import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export default (): CreateSpecificationController => {
    const specificationRepository = new SpecificationRepository();
    
    const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
    
    const createSpecificationController = new CreateSpecificationController(
        createSpecificationUseCase
    );
   
    return createSpecificationController;
}
