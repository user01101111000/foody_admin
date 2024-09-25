import convertToFirebaseImageURL from "../../helpers/convertToFirebaseImageURL";

import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function updateRestaurant({
  name,
  address,
  category,
  cuisine,
  file,
  minute,
  price,
  id,
}) {
  const uuid = id;

  const { data } = await getAxiosStorageInstance().post(
    `/restaurants%2F${uuid}.png`,
    file,
    {
      headers: {
        "Content-Type": file.type,
      },
    }
  );

  const restaurant = {
    fields: {
      id: {
        stringValue: uuid + "",
      },
      name: {
        stringValue: name,
      },
      address: {
        stringValue: address,
      },
      price: {
        stringValue: price + "",
      },
      category: {
        stringValue: category,
      },
      cuisine: {
        stringValue: cuisine,
      },
      minute: {
        stringValue: minute + "",
      },
      image: {
        stringValue: convertToFirebaseImageURL(
          uuid,
          data.downloadTokens,
          "restaurants"
        ),
      },
    },
  };

  await getAxiosFirestoreInstance().patch("/restaurants/" + uuid, restaurant);
}
