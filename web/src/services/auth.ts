import { client, csrf } from "@/services/api";

const user = async () => {
  return await client.get("/api/user");
};

const login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  await csrf();

  return await client.post("/login", { email, password });
};

const logout = async () => {
  return await client.post("/logout");
};

const register = async (payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  await csrf();

  return await client.post("/register", payload);
};

const forgotPassword = async (payload: { email: string }) => {
  await csrf();

  return await client.post("/forgot-password", payload);
};

export default {
  user,
  login,
  logout,
  register,
  forgotPassword,
};
