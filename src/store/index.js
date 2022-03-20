import { createStore } from "vuex";
import Login from "./Login";
import UserInfo from "./UserInfo";
import ResetPassword from "./ResetPassword";

export default createStore({
  modules: {
    Login, UserInfo, ResetPassword,
  },
});
