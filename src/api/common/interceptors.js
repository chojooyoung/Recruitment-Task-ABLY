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
      console.log("error 확인", error);
      // error 처리
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    // response interceptor
    (response) => response,
    (error) => {
      console.log("error 확인", error);
      return Promise.reject(error);
    }
  );
  return instance;
}
