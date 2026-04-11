import { Request, Response, NextFunction } from 'express';
import { requirementSchema } from './validator';
import { createRequirementService, getRequirementByLeadService } from './service';

export const createRequirement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = requirementSchema.parse(req.body);
    const requirement = await createRequirementService(data);
    res.status(201).json(requirement);
  } catch (error) {
    next(error);
  }
};

export const getRequirementByLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leadId = parseInt(req.params.leadId as string);
    const requirement = await getRequirementByLeadService(leadId);
    if (!requirement) {
      return res.status(404).json({ error: "Requirement not found for this lead" });
    }
    res.status(200).json(requirement);
  } catch (error) {
    next(error);
  }
};
