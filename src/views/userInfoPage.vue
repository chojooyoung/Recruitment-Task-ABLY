<template>
  <div class="userinfo_page">
    <UserInfoComponent />
  </div>
</template>

<script>
import UserInfoComponent from "@/components/userInfoComponent.vue";

export default {
  name: "userInfoPage",
  components: {
    UserInfoComponent,
  },
};
</script>
