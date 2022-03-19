import Client from "../AxiosClient";

const resource = "/api/login";

export default {
  requestLogin(userData) {
    return Client.post(`${resource}`, userData);
  },
};
