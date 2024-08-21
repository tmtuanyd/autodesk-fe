import axios from "axios";

const getDocuments = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/models`
  );
  return response.data;
};

const uploadModel = async (file: File) => {
  const data = new FormData();
  data.append("model-file", file);
  if (file.name.endsWith(".zip")) {
    // When uploading a zip file, ask for the main design file in the archive
    const entrypoint = window.prompt(
      "Please enter the filename of the main design inside the archive."
    );
    if (entrypoint !== null) {
      data.append("model-zip-entrypoint", entrypoint);
    }
  }
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/model`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export { uploadModel, getDocuments };
