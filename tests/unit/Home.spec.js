import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import loginRoutes from "@/router/login";
import App from "@/App.vue";
import Home from "@/views/Home.vue";
import store from "@/store/index";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: loginRoutes,
});

describe("Home(Route Page)", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        plugins: [router, store],
      },
    });
  });

  it("로그인 페이지로 라우팅이 잘 되는가?", async () => {
    router.push("/");
    await router.isReady();

    const Appwrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await wrapper.find("[data-test=\"router-login\"]").trigger("click");
    await flushPromises();
    expect(Appwrapper.find(".Login").exists()).toBe(true);
  });
});
