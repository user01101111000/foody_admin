import convertToFirebaseImageURL from "../../helpers/convertToFirebaseImageURL";
import { v4 } from "uuid";

import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function createProduct({
  name,
  description,
  file,
  price,
  restaurant,
}) {
  const uuid = v4().replace(/-/g, "");

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
