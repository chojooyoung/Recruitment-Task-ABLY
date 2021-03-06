import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import Home from "@/views/Home.vue";
import userInfoRoutes from "@/router/userInfo";
import loginRoutes from "@/router/login";
import ResetPassword from "@/router/ResetPassword";

let routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/:notFount(.*)",
    component: NotFound,
  },
];
routes = [].concat(routes, loginRoutes, userInfoRoutes, ResetPassword);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
