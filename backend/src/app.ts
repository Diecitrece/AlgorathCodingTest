import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from '@input_infrastructure/user.routes';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server running');
});
