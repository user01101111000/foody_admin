import convertToFirebaseImageURL from "../../helpers/convertToFirebaseImageURL";

import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function updateProduct({
  name,
  description,
  file,
  price,
  restaurant,
  id,
}) {
  const uuid = id;

  const { data } = await getAxiosStorageInstance().post(
    `/products%2F${uuid}.png`,
    file,
    {
      headers: {
        "Content-Type": file.type,
      },
    }
  );

  const product = {
    fields: {
      id: {
        stringValue: uuid + "",
      },
      name: {
        stringValue: name,
      },
      description: {
        stringValue: description,
      },
      price: {
        stringValue: price + "",
      },
      restaurant: {
        stringValue: restaurant,
      },
      image: {
        stringValue: convertToFirebaseImageURL(
          uuid,
          data.downloadTokens,
          "products"
        ),
      },
    },
  };

  await getAxiosFirestoreInstance().patch("/products/" + uuid, product);
}
