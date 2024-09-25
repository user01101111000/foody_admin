import convertToFirebaseImageURL from "../../helpers/convertToFirebaseImageURL";
import { v4 } from "uuid";

import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function createCategory({ file, category: name }) {
  const uuid = v4().replace(/-/g, "");

  const { data } = await getAxiosStorageInstance().post(
    `/categories%2F${uuid}.png`,
    file,
    {
      headers: {
        "Content-Type": file.type,
      },
    }
  );

  const category = {
    fields: {
      id: {
        stringValue: uuid + "",
      },
      name: {
        stringValue: name,
      },
      slug: {
        stringValue: name.toLowerCase(),
      },
      image: {
        stringValue: convertToFirebaseImageURL(
          uuid,
          data.downloadTokens,
          "categories"
        ),
      },
    },
  };

  await getAxiosFirestoreInstance().patch(`/categories/` + uuid, category);
}
