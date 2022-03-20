import LoginRepository from "./repositories/Login";
import userInfoRepository from "./repositories/UserInfo";
import logoutRepository from "./repositories/Logout";

const repositories = {
  login: LoginRepository,
  userInfo: userInfoRepository,
  logout: logoutRepository,
};
export default {
  get: (name) => repositories[name],
};
