import { Request, Response, NextFunction } from 'express';
import { leadSchema, updateLeadStatusSchema } from './validator';
import { createLeadService, getLeadsService, updateLeadStatusService } from './service';

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = leadSchema.parse(req.body);
    const lead = await createLeadService(data);
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await getLeadsService();
    res.status(200).json(leads);
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const data = updateLeadStatusSchema.parse(req.body);
    const lead = await updateLeadStatusService(id, data);
    res.status(200).json(lead);
  } catch (error) {
    next(error);
  }
};
