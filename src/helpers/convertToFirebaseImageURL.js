const convertToFirebaseImageURL = (name, token, folderName) =>
  `https://firebasestorage.googleapis.com/v0/b/${
    import.meta.env.VITE_PROJECT_ID
  }.appspot.com/o/${folderName}%2F${name}.png?alt=media&token=` + token;

export default convertToFirebaseImageURL;
