<template>
  <div class="reset-password">
    <div class="form-wrapper">
      <h2 class="form-wrapper_header">비밀번호 변경</h2>
      <form class="reset-password-form" @submit.prevent="resetButtonClick">
        <div class="reset-password-form-first_title">바꾸실 비밀번호</div>
        <input
          class="reset-password-form-password"
          v-model="password"
          name="email"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="on"
          required
        />
        <div class="reset-password-form-second-title">비밀번호 재입력</div>
        <input
          class="reset-password-form-confirmpassword"
          v-model="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시한번 입력해주세요."
          autoComplete="on"
          required
        />
        <button class="reset-password-form-reset_button" data-test="reset_button">
          비밀번호 변경하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import RepositoryFactory from "@/api/RepositoryFactory";

const resetPwRepository = RepositoryFactory.get("resetPassword");

const { mapActions, mapGetters } = createNamespacedHelpers("ResetPassword");

export default {
  name: "ResetPasswordComponent",
  data() {
    return {
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    ...mapActions(["initClearAlltoken"]),
    ...mapGetters(["getUserEmail", "getConfirmToken"]),
    async resetButtonClick() {
      if (this.password !== this.confirmPassword) {
        // eslint-disable-next-line no-alert
        alert("비밀번호가 일치하지 않아요");
        return;
      }
      const resetData = {
        email: this.getUserEmail(),
        confirmToken: this.getConfirmToken(),
        newPassword: this.password,
        newPasswordConfirm: this.confirmPassword,
      };
      const response = await resetPwRepository.requestResetPassWord(resetData);
      // eslint-disable-next-line no-unused-expressions
      console.log(response);
      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert("정상적으로 변경 되었습니다!");
        this.initClearAlltoken();
        this.$router.push("/login");
      } else {
        // eslint-disable-next-line no-alert
        alert(`${response.data.error.message}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.reset-password-form{
  width:100%;
  align-content: center;
  align-items: center;
  display: flex;
  gap:10px;
  flex-direction: column;
  justify-content: center;

  &-first_title{
    font-weight: bold;
    max-width:300px;
    width:100%;
    text-align: left;
  }
  &-second-title{
    font-weight: bold;
    max-width:300px;
    width:100%;
    text-align: left;
  }
  &-password{
    max-width:300px;
    width:100%;
    height:30px;
    border:solid 0.1px;
    border-radius: 10px;
  }
  &-confirmpassword{
    max-width:300px;
    width:100%;
    height:30px;
    border:solid 0.1px;
    border-radius: 10px;
  }
  &-reset_button{
    max-width:200px;
    width:100%;
    height:25px;
    background: black;
    color: white;
    border:solid 0.1px;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
