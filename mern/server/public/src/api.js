import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/users"
})

export const getUsers = () => API.get("/");

export const createUser = (data) => API.post("/", data);

export const deleteUser = (id) => API.delete(`/${id}`);

export const updateUser = (id, data) => API.patch(`/${id}`, data)
