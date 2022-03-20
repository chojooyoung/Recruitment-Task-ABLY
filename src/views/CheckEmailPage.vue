<template>
  <div class="reset-password">
    <PageInfoHeader :pageName="pageName"/>
    <CheckEmailComponent />
  </div>
</template>

<script>
import PageInfoHeader from "@/components/PageInfoHeader.vue";
import CheckEmailComponent from "@/components/CheckEmailComponent.vue";

export default {
  name: "CheckEmailPage",
  components: {
    CheckEmailComponent, PageInfoHeader,
  },
  data() {
    return {
      pageName: "비밀번호 변경하기",
    };
  },
};
</script>
