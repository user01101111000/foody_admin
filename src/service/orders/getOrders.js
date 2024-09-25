import { getAxiosFirestoreInstance } from "../axios-instance";

export default async function getOrders() {
  const { data } = await getAxiosFirestoreInstance().get("/orders");

  return data?.documents || [];
}