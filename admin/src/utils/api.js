import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(BASE_URL + url);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const postData = async (url, formData) => {
  const { res } = await axios.post(BASE_URL + url, formData);
  return res;
};

export const putData = async (url, formData) => {
  try {
    const { data } = await axios.put(BASE_URL + url, formData);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
