import CheckEmailPage from "@/views/CheckEmailPage.vue";
import CheckAuthCodePage from "@/views/CheckAuthCodePage.vue";

const userInfoRoutes = [

  {
    path: "/checkEmailPage",
    name: "CheckEmailPage",
    component: CheckEmailPage,
  },

  {
    path: "/checkAuthCode",
    name: "CheckAuthCodePage",
    component: CheckAuthCodePage,
  },

];

export default userInfoRoutes;
