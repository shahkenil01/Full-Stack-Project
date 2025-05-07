import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("http://localhost:4000" + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, formData) => {
  const { res } = await axios.post("http://localhost:4000" + url, formData);
  return res;
};

export const putData = async (url, formData) => {
  try {
    const { data } = await axios.put("http://localhost:4000" + url, formData);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
