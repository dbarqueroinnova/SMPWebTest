import axios from "axios";

export const getAccessToken = async () => {
    return axios.get('/api/hello_');
  };