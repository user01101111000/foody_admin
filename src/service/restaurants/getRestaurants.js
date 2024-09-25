import { getAxiosFirestoreInstance } from "../axios-instance";

export default async function getRestaurants() {
  const { data } = await getAxiosFirestoreInstance().get("/restaurants");

  return data?.documents || [];
}
