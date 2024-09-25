import { getAxiosFirestoreInstance } from "../axios-instance";

export default async function deleteOrder(id) {
  try {
    await getAxiosFirestoreInstance().delete(`/orders/${id}`);
  } catch (error) {
    console.log(error);
  }
}
