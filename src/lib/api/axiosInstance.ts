import axios from "axios";

import { REACT_APP_SERVER_URL } from "@Library/constants/server";

const axiosInstance = axios.create({ baseURL: REACT_APP_SERVER_URL });

const interceptorError = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return Promise.reject(error);
  }
  // NOTE: 서버에서 응답한 상태
  if (error.response) {
    return Promise.reject(error);
  }

  // NOTE: 서버에서 응답하지 못한 상태
  if (error.request) {
    return Promise.reject(error);
  }

  // NOTE: 요청, 응답이 모두 이루지지 않은 상태
  return Promise.reject(error);
};
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => interceptorError(error)
);

export default axiosInstance;
