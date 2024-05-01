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

export const csrf = () => client.get("/sanctum/csrf-cookie");

export const getTasks = async () => {
  await csrf();
  return await client.get("/api/tasks");
};
