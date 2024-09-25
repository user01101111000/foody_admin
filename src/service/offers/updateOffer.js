import convertToFirebaseImageURL from "../../helpers/convertToFirebaseImageURL";

import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function updateOffer({ title, description, file, id }) {
  const uuid = id;

  const { data } = await getAxiosStorageInstance().post(
    `/offers%2F${uuid}.png`,
    file,
    {
      headers: {
        "Content-Type": file.type,
      },
    }
  );

  const offer = {
    fields: {
      id: {
        stringValue: uuid + "",
      },
      title: {
        stringValue: title,
      },
      description: {
        stringValue: description,
      },
      image: {
        stringValue: convertToFirebaseImageURL(
          uuid,
          data.downloadTokens,
          "offers"
        ),
      },
    },
  };

  await getAxiosFirestoreInstance().patch("/offers/" + uuid, offer);
}
