import axios from "axios";
import { getAccessToken } from "./getAccessToken";
const apiBaseUri = 'https://segurosmarketplaceapi.innovasoltec.com/api/v1';

const getHeaders = async () => {
  try {
    const accessTokenApi = await getAccessToken()
    return { access_token: accessTokenApi.data }
  } catch (error) {
    console.log(error)
  }
}

export const fetch = async (endpoint) => {
  const token = await getHeaders()
  return axios.get(`${apiBaseUri}${endpoint}`, {headers: {Authorization: `Bearer ${token.access_token}`}});
};
export const post = async (endpoint, body) => {
  return axios.post(`${apiBaseUri}${endpoint}`, body, { headers: getHeaders() });
};
export const put = async (endpoint, body) => {
  return axios.put(`${apiBaseUri}${endpoint}`, body, { headers: getHeaders() });
};
