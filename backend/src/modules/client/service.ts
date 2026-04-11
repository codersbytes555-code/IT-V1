import { prisma } from '../../config/db';
import { ClientInput } from './interface';

export const createClientService = async (data: ClientInput) => {
  return await prisma.client.create({ data });
};

export const getClientsService = async () => {
  return await prisma.client.findMany({
    include: { lead: true, projects: true }
  });
};
