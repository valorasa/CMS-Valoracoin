 import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 5000,
 // headers: { Authorization: "Bearer RmvGoCB7yQiJw1x_al_JqlKPfabjm-SY" },
});

export default axiosInstance;
