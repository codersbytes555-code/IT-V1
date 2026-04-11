import { Request, Response, NextFunction } from 'express';
import { projectSchema } from './validator';
import { createProjectService, getProjectsByClientService } from './service';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = projectSchema.parse(req.body);
    const project = await createProjectService(data);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjectsByClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientId = parseInt(req.params.clientId as string);
    const projects = await getProjectsByClientService(clientId);
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};
