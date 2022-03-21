import CheckEmailPage from "@/views/CheckEmailPage.vue";
import CheckAuthCodePage from "@/views/CheckAuthCodePage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";

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
  {
    path: "/resetPw",
    name: "ResetPasswordPage",
    component: ResetPasswordPage,
  },

];

export default userInfoRoutes;
