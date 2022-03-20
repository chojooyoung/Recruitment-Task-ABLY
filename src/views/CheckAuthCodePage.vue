<template>
  <div class="reset-password">
    <PageInfoHeader :pageName="pageName"/>
    <CheckAuthCodeComponent />
  </div>
</template>

<script>
import PageInfoHeader from "@/components/PageInfoHeader.vue";
import CheckAuthCodeComponent from "@/components/CheckAuthCodeComponent.vue";

export default {
  name: "LoginPage",
  components: {
    CheckAuthCodeComponent, PageInfoHeader,
  },
  data() {
    return {
      pageName: "비밀번호 변경하기 - 인증번호 입력",
    };
  },
};
</script>
