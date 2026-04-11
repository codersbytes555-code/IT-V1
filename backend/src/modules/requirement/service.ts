import { prisma } from '../../config/db';
import { RequirementInput } from './interface';

export const createRequirementService = async (data: RequirementInput) => {
  return await prisma.requirement.create({ data });
};

export const getRequirementByLeadService = async (leadId: number) => {
  return await prisma.requirement.findUnique({
    where: { leadId }
  });
};
