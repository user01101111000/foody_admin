import { getAxiosFirestoreInstance } from "../axios-instance";

export default async function getCategories() {
  const { data } = await getAxiosFirestoreInstance().get("/categories");

  return data?.documents || [];
}
