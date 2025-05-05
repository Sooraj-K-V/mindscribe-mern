// import axios from "axios";

// const token = localStorage.getItem("token");

// export const instance = axios.create({
//   baseURL: "http://localhost:3000/api",
//   header: {
//     Authorization: token ? `Bearer ${token}` : "",
//   },
// });

// axiosInstance.js
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Attach token dynamically before each request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers, // make sure other headers are preserved
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);
