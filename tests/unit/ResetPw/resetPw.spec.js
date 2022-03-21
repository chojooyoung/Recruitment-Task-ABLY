import { mount, flushPromises } from "@vue/test-utils";
import { createStore } from "vuex";
import ResetPasswordComponent from "@/components/ResetPasswordComponent.vue";
import resetPwApiFunctions from "@/api/repositories/ResetPassword";
import ResetPassword from "@/store/ResetPassword";

describe("CheckAuthCodePage", () => {
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };
  beforeEach(() => {
    const res = {
      status: 200,
    };
    const store = createStore({
      modules: {
        ResetPassword,
      },
    });
    wrapper = mount(ResetPasswordComponent, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
      plugins: [store],
    });
    resetPwApiFunctions.requestResetPassWord = jest.fn().mockResolvedValue(res);
  });

  it("인증확인 컴포넌트가 렌더링이 잘 되었는가?", () => {
    expect(wrapper.find(".reset-password").exists()).toBe(true);
  });

  it("다음버튼 클릭시 인증성공 여부와 관계없이 알림처리가 잘 되는가?", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => { });

    const userData = {
      password: "111111",
    };

    await wrapper.get("input[type=\"password\"]").setValue(userData.password);
    await wrapper.find("[data-test=\"reset_button\"]").trigger("click");
    await expect(window.alert).toBeCalled;
  });

  it("mocking한 api repository함수가 호출되는가", async () => {
    await resetPwApiFunctions.requestResetPassWord();
    expect(resetPwApiFunctions.requestResetPassWord).toHaveBeenCalledTimes(1);
  });

  it("mocking한 api repository함수로 alert이 동작하는가", async () => {
    await resetPwApiFunctions.requestResetPassWord();
    jest.spyOn(window, "alert").mockImplementation(() => { });
    await wrapper.find("[data-test=\"reset_button\"]").trigger("click");
    await expect(window.alert).toBeCalled;
  });

  it("mocking한 router함수로 라우팅이 잘 동작하는가에 대한 테스트", async () => {
    await resetPwApiFunctions.requestResetPassWord();
    await wrapper.find("[data-test=\"reset_button\"]").trigger("click");
    setTimeout(() => {
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    }, 100);
  });
});
