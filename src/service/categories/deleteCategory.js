import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function deleteCategory(id) {
  try {
    await getAxiosStorageInstance().delete(`/categories%2F${id}.png`);

    await getAxiosFirestoreInstance().delete(`/categories/${id}`);
  } catch (error) {
    console.log(error);
  }
}
