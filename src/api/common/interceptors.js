const convertResponse = (res) => {
  const response = {
    status: "",
    data: null,
  };
  response.status = res.status;
  response.data = res.data;

  return response;
};

// eslint-disable-next-line import/prefer-default-export
export function setInterceptors(instance) {
  instance.interceptors.request.use(
    // request interceptor
    (config) => {
      // request 보내기 전에 할 로직
      const API_AUTH = "";
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = API_AUTH; // header에 인증 추가
      return config;
    },
    (error) => {
      Promise.reject(error);
      return convertResponse(error.response);
    },
  );

  instance.interceptors.response.use(
    // response interceptor
    (response) => response,
    (error) => {
      Promise.reject(error);
      return convertResponse(error.response);
    },
  );
  return instance;
}
