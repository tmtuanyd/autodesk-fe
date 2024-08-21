import axios from "axios";

export const getAccessToken = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/token`
  );
  return response.data;
};
