import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function deleteOffer(id) {
  try {
    await getAxiosStorageInstance().delete(`/offers%2F${id}.png`);

    await getAxiosFirestoreInstance().delete(`/offers/${id}`);
  } catch (error) {
    console.log(error);
  }
}
