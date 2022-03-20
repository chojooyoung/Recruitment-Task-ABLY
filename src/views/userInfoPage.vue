<template>
  <div class="userinfo_page">
    <UserInfoComponent />
  </div>
</template>

<script>
import UserInfoComponent from "@/components/UserInfoComponent.vue";

export default {
  name: "UserInfoPage",
  components: {
    UserInfoComponent,
  },
};
</script>
