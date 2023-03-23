 import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://coin-api.valorareciclaveis.com.br",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
