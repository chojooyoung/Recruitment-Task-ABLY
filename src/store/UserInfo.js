import storage from "@/utils/sessionStorage";

export default {
  namespaced: true,
  state() {
    return {
      userData: "",
    };
  },
  getters: {

  },
  mutaions: {
    initUserInfo(state, userData) {
      state.userData = userData;
    },

  },
  actions: {
  },
};
