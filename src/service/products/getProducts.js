import { getAxiosFirestoreInstance } from "../axios-instance";

export default async function getProducts() {
  const { data } = await getAxiosFirestoreInstance().get("/products");

  return data?.documents || [];
}
