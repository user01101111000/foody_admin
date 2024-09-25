import { getAxiosFirestoreInstance } from "../axios-instance";

export default async function getOffers() {
  const { data } = await getAxiosFirestoreInstance().get("/offers");

  return data?.documents || [];
}
