import { prisma } from '../../config/db';
import { LeadInput, LeadUpdateInput } from './interface';

export const createLeadService = async (data: LeadInput) => {
  return await prisma.lead.create({ data });
};

export const getLeadsService = async () => {
  return await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const updateLeadStatusService = async (id: number, data: LeadUpdateInput) => {
  return await prisma.lead.update({
    where: { id },
    data
  });
};
