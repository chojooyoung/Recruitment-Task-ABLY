import axios from "axios";
import { setInterceptors } from "./common/interceptors";

const baseDomain = "https://ably-frontend-assignment-server.vercel.app";
const baseURL = `${baseDomain}`; // Incase of /api/v1;

function createInstance() {
  const instance = axios.create({
    // AxiosRequestConfig = axios 공통 설정란
    baseURL, // process.env.API_ENDPOINT
  });

  return setInterceptors(instance);
}

const instance = createInstance();

export default instance;
