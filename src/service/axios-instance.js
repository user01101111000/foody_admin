import axios from "axios";

const getAxiosFirestoreInstance = () => {
  return axios.create({
    baseURL: `https://firestore.googleapis.com/v1/projects/${
      import.meta.env.VITE_PROJECT_ID
    }/databases/(default)/documents`,
  });
};

const getAxiosStorageInstance = () => {
  return axios.create({
    baseURL: `https://firebasestorage.googleapis.com/v0/b/${
      import.meta.env.VITE_PROJECT_ID
    }.appspot.com/o`,
  });
};

const getAxiosAuthInstance = (type) => {
  return axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${
      import.meta.env.VITE_API_KEY
    }`,
  });
};

export {
  getAxiosFirestoreInstance,
  getAxiosStorageInstance,
  getAxiosAuthInstance,
};
