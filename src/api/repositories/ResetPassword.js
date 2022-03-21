import Client from "../AxiosClient";

const resource = "/api/reset-password";

export default {
  requestAuthCodeToResetPw(params) {
    return Client.get(`${resource}`, { params });
  },
  checkAuthCode(authData) {
    return Client.post(`${resource}`, authData);
  },
  requestResetPassWord(resetData) {
    return Client.patch(`${resource}`, resetData);
  },
};
