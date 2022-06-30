import { Request, Response, Router } from 'express';
import { User } from '@domain/user.model';
import bodyParser from 'body-parser';
import { dependenciesContainer } from '@shared/dependency_injection';
import { UserCRUD } from '@ports/input/userCRUD.port';
import { schemaCreateUser } from './validate_body.user';
const user_useCases: UserCRUD = dependenciesContainer.cradle.user_useCases();

export const userRouter = Router();
userRouter.use(bodyParser.json());

userRouter.post(
  '/api/users',
  async (req: Request, res: Response): Promise<void> => {
    const validation = schemaCreateUser.validate(req.body);
    if (validation.error) {
      res.status(400).send(validation.error?.details[0].message);
      return;
    }
    const name: string = req.body.name;
    const newUser = await user_useCases.create(name);
    if (newUser) {
      res.status(201).json(newUser);
      return;
    }
    res.status(400).send('User already exists');
    return;
  }
);
userRouter.post(
  '/api/users/connect',
  async (req: Request, res: Response): Promise<void> => {
    const { id1, id2 } = req.body;
    if (!id1 || !id2) {
      res.status(400).send('id1 and/or id2 missing');
      return;
    }
    if (id1 === id2) {
      res.status(400).send('id1 and id2 can not be equal');
      return;
    }
    const newConnection = await user_useCases.connect(id1, id2);
    if (newConnection) {
      res.status(201).send('Connection stablished');
      return;
    }
    if (newConnection === false) {
      res.status(201).send('Users disconnected');
      return;
    }
    res.status(400).send('Any of the given users does not exist');
  }
);
userRouter.get(
  '/api/users',
  async (req: Request, res: Response): Promise<void> => {
    const users = await user_useCases.getAll();
    res.status(200).json(users);
  }
);
userRouter.get(
  '/api/users/connections',
  async (req: Request, res: Response): Promise<void> => {
    const connections = await user_useCases.getAllConnections();
    res.status(200).json(connections);
    return;
  }
);
userRouter.get(
  '/api/users/connections/:id',
  async (req: Request, res: Response): Promise<void> => {
    if (typeof req.params.id !== 'string') {
      res.status(400).send('Invalid ID');
      return;
    }
    const id: string = req.params.id;
    const users = await user_useCases.getConnected(id);
    if (users) {
      res.status(200).json(users);
      return;
    }
    res.status(404).send('User not found');
    return;
  }
);
userRouter.get(
  '/api/users/:id',
  async (req: Request, res: Response): Promise<void> => {
    if (typeof req.params.id !== 'string') {
      res.status(400).send('Invalid ID');
      return;
    }
    const id: string = req.params.id;
    const user = await user_useCases.getOne(id);
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.status(404).send('User not found');
    return;
  }
);
