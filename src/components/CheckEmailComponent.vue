<template>
  <div class="reset-password">
    <form class="reset-password-form" @submit.prevent="nextButtonClick()">
        <input
          class="reset-password-form-email"
          v-model="userEmail"
          name="email"
          type="text"
          placeholder="이메일을 입력해주세요"
          maxlength="30"
          required
        />
        <button
            class="reset-password-form-nextbutton"
            data-test="next_button">
          다음
        </button>
      </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import RepositoryFactory from "@/api/RepositoryFactory";
import storage from "@/utils/sessionStorage";

const resetPwRepository = RepositoryFactory.get("resetPassword");

const { mapActions } = createNamespacedHelpers("ResetPassword");

export default {
  name: "ResetPasswordComponent",

  data() {
    return {
      userEmail: "",
    };
  },

  methods: {
    ...mapActions(["initSetUserEmail", "initSetIssueToken", "initSetExpireTime"]),
    async nextButtonClick() {
      const params = { email: this.userEmail };
      const response = await resetPwRepository.requestAuthCodeToResetPw(params);
      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert("인증번호를 성공적으로 보냈습니다!");
        storage.setItem("issueToken", response.data.issueToken);
        storage.setItem("expireTime", response.data.remainMillisecond);
        storage.setItem("userEmail", this.userEmail);
        this.initSetUserEmail();
        this.initSetIssueToken();
        this.initSetExpireTime();
        this.$router.push("/checkAuthCode");
      } else {
        // eslint-disable-next-line no-alert
        alert(response.data.error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password-form-nextbutton{
    max-width:50px;
    width:100%;
    height:25px;
    background: black;
    color: white;
    border:solid 0.1px;
    border-radius: 10px;
    cursor: pointer;
}
</style>
