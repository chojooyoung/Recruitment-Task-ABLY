import storage from "@/utils/sessionStorage";

export default {
  namespaced: true,
  state() {
    return {
      userEmail: storage.getItem("userEmail") || "",
      issueToken: storage.getItem("issueToken") || "",
      expireTime: storage.getItem("expireTime") || "",
      confirmToken: storage.getItem("confirmToken") || "",
    };
  },
  getters: {
    getUserEmail(state) {
      return state.userEmail;
    },
    getIssueToken(state) {
      return state.issueToken;
    },
    getexpireTime(state) {
      return state.expireTime;
    },
    getConfirmToken(state) {
      return state.confirmToken;
    },
  },
  mutations: {
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
    clearUserEmail(state) {
      state.userEmail = "";
      storage.removeItem("userEmail");
    },
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
    setConfirmToken(state, confirmToken) {
      state.confirmToken = confirmToken;
    },
    clearConfirmToken(state) {
      state.expireTime = "";
      storage.removeItem("confirmToken");
    },
  },
  actions: {
    initSetUserEmail({ commit }) {
      commit("setUserEmail", storage.getItem("userEmail"));
    },
    initClearUserEmail({ commit }) {
      commit("clearUserEmail");
    },
    initSetIssueToken({ commit }) {
      commit("setIssueToken", storage.getItem("issueToken"));
    },
    initClearIssueToken({ commit }) {
      commit("clearIssueToken");
    },
    initSetExpireTime({ commit }) {
      commit("setExpireTime", storage.getItem("expireTime"));
    },
    initclearExpireTime({ commit }) {
      commit("clearExpireTime");
    },
    initSetConfirmToken({ commit }) {
      commit("setConfirmToken", storage.getItem("confirmToken"));
    },
    initClearConfirmToken({ commit }) {
      commit("clearConfirmToken");
    },
    initClearAlltoken({ commit }) {
      commit("clearConfirmToken");
      commit("clearExpireTime");
      commit("clearIssueToken");
      commit("clearUserEmail");
    },
  },
};
