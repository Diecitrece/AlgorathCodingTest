import { Request, Response, Router } from 'express';
import { User } from '@domain/user.model';
import bodyParser from 'body-parser';
import { dependenciesContainer } from '@shared/dependency_injection';
import { UserCRUD } from '@ports/input/userCRUD.port';
const user_useCases: UserCRUD = dependenciesContainer.cradle.user_useCases();

export const userRouter = Router();
userRouter.use(bodyParser.json());

userRouter.get(
  '/api/users',
  async (req: Request, res: Response): Promise<void> => {
    const users = await user_useCases.getAll();
    res.status(200).json(users);
  }
);
