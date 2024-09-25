import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function deleteProduct(id) {
  try {
    await getAxiosStorageInstance().delete(`/products%2F${id}.png`);

    await getAxiosFirestoreInstance().delete(`/products/${id}`);
  } catch (error) {
    console.log(error);
  }
}
