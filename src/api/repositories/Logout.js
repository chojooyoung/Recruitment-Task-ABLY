import Client from "../AxiosClient";

const resource = "/api/logout";

export default {
  logout() {
    return Client.post(`${resource}`);
  },
};
