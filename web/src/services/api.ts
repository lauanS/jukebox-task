import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:8989",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export type Task = {
  title: string;
  description: string;
};

export const csrf = () => client.get("/sanctum/csrf-cookie");

export const listTasksService = async () => {
  return await client.get("/api/tasks");
};

export const createTaskService = async (payload: Task) => {
  return await client.post("/api/tasks", payload);
};

export const updateTaskService = async (id: number, payload: Task) => {
  return await client.put(`/api/tasks/${id}`, payload);
};

export const deleteTaskService = async (id: number) => {
  return await client.delete(`/api/tasks/${id}`);
};
