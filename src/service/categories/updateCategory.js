import convertToFirebaseImageURL from "../../helpers/convertToFirebaseImageURL";

import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function updateCategory({ file, category: newName, id }) {
  const uuid = id;

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
        stringValue: newName,
      },
      slug: {
        stringValue: newName.toLowerCase(),
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
