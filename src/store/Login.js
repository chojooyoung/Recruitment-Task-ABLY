import storage from "@/utils/sessionStorage";

export default {
  namespaced: true,
  state() {
    return {
      authToken: storage.getItem("authToken") || "",
    };
  },
  getters: {
    getAuthToken(state) {
      return state.authToken;
    },
    isLogin(state) {
      return state.authToken !== "";
    },
  },
  mutations: {
    setAuthToken(state, authToken) {
      state.authToken = authToken;
    },
    clearAuthToken(state) {
      state.authToken = "";
    },
  },
  actions: {
    initSetAuthToken({ commit }) {
      console.log(storage.getItem("authToken"));
      commit("setAuthToken", storage.getItem("authToken"));
    },
    initClearAuthToken({ commit }) {
      commit("clearAuthToken", storage.removeItem("authToken"));
    },
  },
};
