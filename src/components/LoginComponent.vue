<template>
  <div class="Login">
    <h1>환영합니다! 로그인을 해주세요!</h1>
    <div class="form-wrapper">
      <h2 class="form-wrapper_header">로그인</h2>
      <form class="login-form" @submit.prevent="loginButtonClick()">
        <div class="login-form-first_title">이메일</div>
        <input
          class="login-form-email"
          v-model="email"
          name="email"
          type="text"
          placeholder="이메일을 입력해주세요"
          maxlength="30"
          required
        />
        <div class="login-form-second_title">비밀번호</div>
        <input
          class="login-form-password"
          v-model="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="on"
          maxlength="30"
          required
        />
        <button class="login-form-loginbutton" data-test="login_button">
          로그인 하기
        </button>
      </form>
      <button class="reset_password" @click="resetPwClick">
          비밀번호 재설정하기
      </button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import RepositoryFactory from "@/api/RepositoryFactory";
import storage from "@/utils/sessionStorage";

const { mapActions } = createNamespacedHelpers("Login");
const loginRepository = RepositoryFactory.get("login");
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["initSetAuthToken"]),
    async loginButtonClick() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      const response = await loginRepository.requestLogin(userData);
      // eslint-disable-next-line no-unused-expressions
      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert("로그인성공!");
        storage.setItem("authToken", response.data.accessToken);
        this.initSetAuthToken();
        this.$router.push("/userinfo");
      } else {
        // eslint-disable-next-line no-alert
        alert(`${response.data.error.message}`);
      }
    },
    resetPwClick() {
      this.$router.push("/checkEmailPage");
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
.login-form{
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
  &-second_title{
    font-weight: bold;
    max-width:300px;
    width:100%;
    text-align: left;
  }
  &-email{
    max-width:300px;
    width:100%;
    height:30px;
    border:solid 0.1px;
    border-radius: 10px;
  }
  &-password{
    max-width:300px;
    width:100%;
    height:30px;
    border:solid 0.1px;
    border-radius: 10px;
  }
  &-loginbutton{
    max-width:100px;
    width:100%;
    height:25px;
    background: black;
    color: white;
    border:solid 0.1px;
    border-radius: 10px;
    cursor: pointer;
  }
}
.reset_password{
    align-self: center;
    max-width:150px;
    width:100%;
    height:25px;
    background: black;
    color: white;
    border:solid 0.1px;
    border-radius: 10px;
    cursor: pointer;
}
</style>
