<template>
  <div class="Login">
    <h1>환영합니다! 로그인을 해주세요!</h1>
    <div class="form-wrapper">
      <h2 class="form-wrapper_header">로그인</h2>
      <form class="login-form" @submit="loginButtonClick">
        <input
          class="login-form-email"
          v-model="email"
          name="email"
          type="text"
          placeholder="이메일을 입력해주세요"
          required
        />
        <input
          class="login-form-password"
          v-model="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          required
        />
        <button class="login-form-loginbutton">
          로그인 하기
        </button>
      </form>
      <button class="login-form-reset_password">
          비밀번호 재설정하기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
    };
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
.login-form-reset_password{
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
