// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:5001/api", // Update this for production
//   withCredentials: true, // Required if using cookies/sessions
// });

import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
