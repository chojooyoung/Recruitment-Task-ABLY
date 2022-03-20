import Client from "../AxiosClient";

const resource = "/api/user";

export default {
  getUserInfo() {
    return Client.get(`${resource}`);
  },
};
