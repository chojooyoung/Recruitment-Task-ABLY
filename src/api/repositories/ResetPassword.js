import Client from "../AxiosClient";

const resource = "/api/reset-password";

export default {
  requestAuthCodeToResetPw(params) {
    return Client.get(`${resource}`, { params });
  },
};
