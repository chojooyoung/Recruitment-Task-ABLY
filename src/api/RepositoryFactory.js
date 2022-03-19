import LoginRepository from "./repositories/Login";

const repositories = {
  login: LoginRepository,
};
export default {
  get: (name) => repositories[name],
};
