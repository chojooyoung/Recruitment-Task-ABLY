import { mount, flushPromises } from "@vue/test-utils";
import router from "@/router/index";
import App from "@/App.vue";
import Home from "@/views/Home.vue";

describe("Home(Route Page)", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    });
  });

  it("loginPage routing test", async () => {
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
