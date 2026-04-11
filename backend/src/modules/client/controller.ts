import { Request, Response, NextFunction } from 'express';
import { clientSchema } from './validator';
import { createClientService, getClientsService } from './service';

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = clientSchema.parse(req.body);
    const client = await createClientService(data);
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};

export const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await getClientsService();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};
