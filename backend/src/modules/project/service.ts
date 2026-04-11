import { prisma } from '../../config/db';
import { ProjectInput } from './interface';

export const createProjectService = async (data: ProjectInput) => {
  return await prisma.project.create({ data });
};

export const getProjectsByClientService = async (clientId: number) => {
  return await prisma.project.findMany({
    where: { clientId }
  });
};
