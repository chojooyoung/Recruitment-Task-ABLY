import { createStore } from "vuex";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

export default createStore({
  modules: {
    Login, ResetPassword,
  },
});
