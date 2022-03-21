<template>
  <div class="reset-password-check_auth">
    <form class="check_auth-form" @submit.prevent="nextButtonClick()">
        <input
          class="check_auth-form-authCode"
          v-model="authCode"
          name="authCode"
          type="number"
          placeholder="인증번호를 입력해주세요."
          required
        />
        <button
            class="reset-password-form-nextbutton"
            data-test="next_button">
          다음
        </button>
        <div :v-model="TimerStr">{{TimerStr}}</div>
      </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import RepositoryFactory from "@/api/RepositoryFactory";
import storage from "@/utils/sessionStorage";

const resetPwRepository = RepositoryFactory.get("resetPassword");

const { mapActions, mapGetters } = createNamespacedHelpers("ResetPassword");

export default {
  name: "ResetPasswordComponent",

  data() {
    return {
      authCode: "",
      Timer: null,
      TimeCounter: "",
      TimerStr: "03:00",
    };
  },
  mounted() {
    this.initTime();
  },
  unmounted() {
    this.timerStop(this.interval);
  },
  methods: {
    ...mapActions(["initSetAuthToken", "initSetConfirmToken"]),
    ...mapGetters(["getUserEmail", "getIssueToken", "getexpireTime"]),

    timerStart() {
      // 1초에 한번씩 start 호출
      // eslint-disable-next-line radix
      this.TimeCounter = parseInt(this.getexpireTime()) / 1000;
      const interval = setInterval(() => {
        this.TimeCounter -= 1; // 1초씩 감소
        this.TimerStr = this.prettyTime();
        if (this.TimeCounter === 0) {
          this.timerStop(interval);
          // eslint-disable-next-line no-alert
          alert("만료되었습니다. 인증을 다시해주세요.");
          this.$router.push("/checkEmailPage");
        }
      }, 1000);
      return interval;
    },
    timerStop(Timer) {
      clearInterval(Timer);
      this.TimeCounter = "";
    },
    prettyTime() {
      // 시간 형식으로 변환 리턴
      const time = this.TimeCounter / 60;
      // eslint-disable-next-line radix
      const minutes = parseInt(time);
      const secondes = Math.round((time - minutes) * 60);
      return (
        `${minutes.toString().padStart(2, "0")
        }:${
          secondes.toString().padStart(2, "0")}`
      );
    },

    async nextButtonClick() {
      const authData = {
        email: this.getUserEmail(),
        authCode: `${this.authCode}`,
        issueToken: this.getIssueToken(),
      };
      const response = await resetPwRepository.checkAuthCode(authData);
      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert("인증이 완료되었습니다.");
        storage.setItem("confirmToken", response.data.confirmToken);
        this.initSetConfirmToken();
        this.$router.push("/resetPw");
      } else {
        // eslint-disable-next-line no-alert
        alert(response.data.error.message);
      }
    },
    initTime() {
      if (this.Timer != null) {
        this.timerStop(this.Timer);
        this.Timer = null;
      }
      this.Timer = this.timerStart();
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
