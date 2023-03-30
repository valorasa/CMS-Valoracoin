 import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://coin-api.valorareciclaveis.com.br",//process.env.BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
console.log(process.env.BASE_URL)

export default axiosInstance;
