<template>
  <div class="home">
    <HelloWorld />
    <router-link to="/login" data-test="router-login">로그인하기</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
