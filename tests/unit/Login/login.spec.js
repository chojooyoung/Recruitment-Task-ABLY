import { mount } from "@vue/test-utils";
import Login from "@/components/LoginComponent.vue";
import loginApiFunctions from "@/api/repositories/Login";

describe("LoginPage", () => {
  let wrapper;
  beforeEach(() => {
    const res = {
      status: 200,
    };
    wrapper = mount(Login);
    loginApiFunctions.requestLogin = jest.fn().mockResolvedValue(res);
  });

  it("로그인 컴포넌트가 렌더링이 잘 되었는가?", () => {
    expect(wrapper.find(".form-wrapper").exists()).toBe(true);
  });

  it("로그인버튼 클릭시 로그인 알림처리가 잘 되는가?", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => { });
    const userData = {
      email: "ably@dummy.com",
      password: "!abc321#$",
    };
    await wrapper.get("input[type=\"text\"]").setValue(userData.email);
    await wrapper.get("input[type=\"password\"]").setValue(userData.password);
    await wrapper.find("[data-test=\"login_button\"]").trigger("click");
    await expect(window.alert).toBeCalled;
  });

  it("로그인버튼 클릭시 로그인 알림처리가 잘 되는가?", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => { });
    await wrapper.find("[data-test=\"login_button\"]").trigger("click");
    await expect(window.alert).toBeCalled;
  });

  it("mocking한 api repository함수가 호출되는가", async () => {
    await loginApiFunctions.requestLogin();
    expect(loginApiFunctions.requestLogin).toHaveBeenCalledTimes(1);
  });

  it("mocking한 api repository함수로 alert이 동작하는가", async () => {
    await loginApiFunctions.requestLogin();
    jest.spyOn(window, "alert").mockImplementation(() => { });
    await wrapper.find("[data-test=\"login_button\"]").trigger("click");
    await expect(window.alert).toBeCalled;
  });
});
