import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import Home from "@/views/Home.vue";

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
routes = [].concat(routes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
