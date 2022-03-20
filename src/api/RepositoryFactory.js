import LoginRepository from "./repositories/Login";
import userInfoRepository from "./repositories/UserInfo";
import logoutRepository from "./repositories/Logout";
import ResetPwRepository from "./repositories/ResetPassword";

const repositories = {
  login: LoginRepository,
  userInfo: userInfoRepository,
  logout: logoutRepository,
  resetPassword: ResetPwRepository,
};
export default {
  get: (name) => repositories[name],
};
