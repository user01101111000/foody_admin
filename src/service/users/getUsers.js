import { getAxiosFirestoreInstance } from "../axios-instance";

export default async function getUsers() {
  const { data } = await getAxiosFirestoreInstance().get("/users");

  return data?.documents || [];
}
