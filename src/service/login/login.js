import { getAxiosAuthInstance } from "../axios-instance";

export default async function login({ email, password }) {
  const { data } = await getAxiosAuthInstance("signInWithPassword").post("", {
    email,
    password,
  });

  return data;
}
