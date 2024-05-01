import { client, csrf } from "@/services/api";

const user = async () => {
  console.log("Service/auth.ts::user");
  await csrf();

  return await client.post("/api/user");
};

const login = async (payload: { email: string; password: string }) => {
  console.log("Service/auth.ts::login");
  const { email, password } = payload;

  await csrf();

  return await client.post("/login", { email, password });
};

export default {
  user,
  login,
};
