import { TOKEN_KEY } from "@/lib/cookieUtils";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_NODE_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY);

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      Cookies.remove(TOKEN_KEY);
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
