import { mount, flushPromises } from "@vue/test-utils";
import UserInfo from "@/components/UserInfoComponent.vue";
import userInfoApiFunctions from "@/api/repositories/UserInfo";
import store from "@/store/index";

describe("LoginPage", () => {
  let wrapper;

  const userData = {
    email: "ably@dummy.com",
    name: "에이블리",
    profileImage: "https://loremflickr.com/400/400",
  };

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    const res = {
      status: 200,
      data: userData,
    };
    wrapper = mount(UserInfo, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    userInfoApiFunctions.getUserInfo = jest.fn().mockResolvedValue(res);
  });

  it("유저정보 컴포넌트가 렌더링이 잘 되었는가?", () => {
    expect(wrapper.find(".user-info").exists()).toBe(true);
  });

  it("유저 정보 관련 태그들이 데이터를 잘 나타내는가?", async () => {
    await wrapper.setData({
      userName: userData.name,
      userEmail: userData.email,
      userProfileImage: userData.profileImage,
    });
    await expect(wrapper.find("[data-test=\"user-name\"]").text()).toContain(userData.name);
    await expect(wrapper.find("[data-test=\"user-email\"]").text()).toContain(userData.email);
    await expect(wrapper.find("[data-test=\"user-profileimg\"]").attributes().src).toContain(userData.profileImage);
  });

  it("로그아웃버튼 클릭시 알림처리가 잘 되는가?", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => { });
    await wrapper.find("[data-test=\"logout_button\"]").trigger("click");
    await expect(window.alert).toBeCalled;
  });

  it("mocking한 api repository함수가 호출되는가", async () => {
    await userInfoApiFunctions.getUserInfo();
    expect(userInfoApiFunctions.getUserInfo).toHaveBeenCalledTimes(1);
  });

  it("mocking한 api repository함수로 렌더링이 잘이루어지는가", async () => {
    await userInfoApiFunctions.getUserInfo();
    await flushPromises();
    await expect(wrapper.find("[data-test=\"user-name\"]").text()).toContain(userData.name);
    await expect(wrapper.find("[data-test=\"user-email\"]").text()).toContain(userData.email);
    await expect(wrapper.find("[data-test=\"user-profileimg\"]").attributes().src).toContain(userData.profileImage);
  });

  it("mocking한 router함수로 로그아웃 라우팅이 잘 동작하는가에 대한 테스트", async () => {
    await userInfoApiFunctions.getUserInfo();
    jest.spyOn(window, "alert").mockImplementation(() => { });

    await wrapper.find("[data-test=\"logout_button\"]").trigger("click");
    await expect(window.alert).toBeCalled;
    setTimeout(() => {
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    }, 100);
  });
});
