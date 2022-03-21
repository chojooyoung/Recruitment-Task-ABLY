import UserInfoPage from "@/views/UserInfoPage.vue";
import store from "@/store/index";

const userInfoRoutes = [

  {
    path: "/userinfo",
    name: "UserInfoPage",
    component: UserInfoPage,
    meta: { auth: true }, // 인증이 필요한 페이지란 것을 알리는 태그
    // 라우터 beforeEnter 가드 함수.
    beforeEnter(to, from, next) {
      // 인증이 필요한 페이지이고(and), store를 불러와 로그인 상태가 아니라면
      if (to.meta.auth && !store.getters["Login/isLogin"]) {
        // next 키워드로 로그인 상태페이지로 보내버린다.
        // eslint-disable-next-line no-alert
        alert("인증이 필요한 페이지 입니다.");
        next("/login");
        return;
      }
      // 로그인을 한 상태면 그대로 페이지로 접근시킨다.
      next();
    },
  },

];

export default userInfoRoutes;
