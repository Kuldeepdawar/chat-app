import axios from "axios";

// creating a  instance for axios when we get axios in all components using  axios.create({baseURL})

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
