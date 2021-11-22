import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationsUseCase = container.resolve(CreateCarSpecificationUseCase);

    const cars = await createCarSpecificationsUseCase.execute({ car_id: id, specifications_id });

    return response.json(cars);
  }
}

export { CreateCarSpecificationsController }