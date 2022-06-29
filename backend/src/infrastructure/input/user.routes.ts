import { Request, Response, Router } from 'express';
import { User } from '@domain/user.model';
import bodyParser from 'body-parser';

export const userRouter = Router();
userRouter.use(bodyParser.json());

userRouter.get(
  'api/users',
  async (req: Request, res: Response): Promise<void> => {
    const users = await user.useCases.getAll();
  }
);
