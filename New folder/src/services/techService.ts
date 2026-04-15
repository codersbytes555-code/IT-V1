import axiosInstance from "../lib/axiosInstance";

export const getTechnologies = async (limit: number = 10, page: number = 1) => {
  const response = await axiosInstance.get(`/technology`, {
    params: { limit, page },
  });
  return response.data;
};

export const createTechnology = async (data: any) => {
  const response = await axiosInstance.post(`/technology`, data);
  return response.data;
};

export const deleteTechnology = async (id: string) => {
  const response = await axiosInstance.delete(`/technology/${id}`);
  return response.data;
};
