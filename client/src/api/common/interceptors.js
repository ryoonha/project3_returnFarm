export function setInterceptors(instance, check) {
  instance.interceptors.request.use(
    function (config) {
      if (check) {
        config.headers["Content-Type"] = "multipart/form-data; charset=utf-8";
      } else {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
      }
      config.withCredentials = true;
      config.headers.authorization = localStorage.getItem("token");
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // 응답에 대한 리턴값 설정 및 오류 발생에 대한 처리
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
}
