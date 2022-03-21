<template>
  <div class="reset-password">
    <PageInfoHeader :pageName="pageName"/>
    <ResetPasswordComponent />
  </div>
</template>

<script>
import PageInfoHeader from "@/components/PageInfoHeader.vue";
import ResetPasswordComponent from "@/components/ResetPasswordComponent.vue";

export default {
  name: "ResetPasswordPage",
  components: {
    ResetPasswordComponent, PageInfoHeader,
  },
  data() {
    return {
      pageName: "비밀번호 변경하기-비밀번호 확인",
    };
  },
};
</script>
