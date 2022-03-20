import storage from "@/utils/sessionStorage";

export default {
  namespaced: true,
  state() {
    return {
      issueToken: storage.getItem("issueToken") || "",
      expireTime: storage.getItem("expireTime") || "",
    };
  },
  getters: {
    getIssueToken(state) {
      return state.issueToken;
    },
    getexpireTime(state) {
      return state.issueToken;
    },
    isLogin(state) {
      return state.authToken !== "";
    },
  },
  mutations: {
    setIssueToken(state, issueToken) {
      state.issueToken = issueToken;
    },
    clearIssueToken(state) {
      state.issueToken = "";
      storage.removeItem("issueToken");
    },
    setExpireTime(state, expireTime) {
      state.expireTime = expireTime;
    },
    clearExpireTime(state) {
      state.expireTime = "";
      storage.removeItem("expireTime");
    },
  },
  actions: {
    initSetIssueToken({ commit }) {
      console.log(storage.getItem("issueToken"));
      commit("setIssueToken", storage.getItem("issueToken"));
    },
    initClearIssueToken({ commit }) {
      commit("clearIssueToken");
    },
    initSetExpireTime({ commit }) {
      commit("setExpireTime", storage.getItem("expireTime"));
    },
  },
};
