import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function deleteRestaurant(id) {
  try {
    await getAxiosStorageInstance().delete(`/restaurants%2F${id}.png`);

    await getAxiosFirestoreInstance().delete(`/restaurants/${id}`);
  } catch (error) {
    console.log(error);
  }
}
