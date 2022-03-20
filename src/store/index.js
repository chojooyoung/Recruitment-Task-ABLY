import { createStore } from "vuex";
import Login from "./Login";
import UserInfo from "./UserInfo";

export default createStore({
  modules: {
    Login, UserInfo,
  },
});
