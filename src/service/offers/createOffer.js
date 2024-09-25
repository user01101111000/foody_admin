import convertToFirebaseImageURL from "../../helpers/convertToFirebaseImageURL";
import { v4 } from "uuid";

import {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
} from "../axios-instance";

export default async function createOffer({ title, description, file }) {
  const uuid = v4().replace(/-/g, "");

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
