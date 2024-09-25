import { getAxiosAuthInstance } from "../axios-instance";

export default async function updatePassword(passwords) {
  const email = "admin@gmail.com";
  const { oldPassword, newPassword } = passwords;

  const { data } = await getAxiosAuthInstance("signInWithPassword").post("", {
    email,
    password: oldPassword,
  });

  const idToken = data.idToken;

  const formData = {
    idToken: idToken,
    password: newPassword,
  };

  const { data: newData } = await getAxiosAuthInstance("update").post(
    "",
    formData
  );

  return newData;
}
