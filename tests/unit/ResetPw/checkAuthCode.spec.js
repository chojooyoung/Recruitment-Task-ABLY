// import { mount, flushPromises } from "@vue/test-utils";
// import { createStore } from "vuex";
// import CheckAuthCodeComponent from "@/components/CheckAuthCodeComponent.vue";
// import resetPwApiFunctions from "@/api/repositories/ResetPassword";
// import ResetPassword from "@/store/ResetPassword";

// describe("CheckAuthCodePage", () => {
//   let wrapper;
//   const mockRouter = {
//     push: jest.fn(),
//   };
//   beforeEach(() => {
//     const res = {
//       status: 200,
//     };
//     const store = createStore({
//       modules: {
//         ResetPassword,
//       },
//     });
//     wrapper = mount(CheckAuthCodeComponent, {
//       global: {
//         mocks: {
//           $router: mockRouter,
//         },
//       },
//       plugins: [store],
//     });
//     resetPwApiFunctions.checkAuthCode = jest.fn().mockResolvedValue(res);
//   });

//   it("인증확인 컴포넌트가 렌더링이 잘 되었는가?", () => {
//     expect(wrapper.find(".reset-password-check_auth").exists()).toBe(true);
//   });

//   it("다음버튼 클릭시 인증성공 여부와 관계없이 알림처리가 잘 되는가?", async () => {
//     jest.spyOn(window, "alert").mockImplementation(() => { });

//     const userData = {
//       code: "111111",
//     };

//     await wrapper.get("input[type=\"text\"]").setValue(userData.code);
//     await wrapper.find("[data-test=\"next_button\"]").trigger("click");
//     await expect(window.alert).toBeCalled;
//   });

//   it("mocking한 api repository함수가 호출되는가", async () => {
//     await resetPwApiFunctions.checkAuthCode();
//     expect(resetPwApiFunctions.RequestCodeToResetPw).toHaveBeenCalledTimes(1);
//   });

//   it("mocking한 api repository함수로 alert이 동작하는가", async () => {
//     await resetPwApiFunctions.checkAuthCode();
//     jest.spyOn(window, "alert").mockImplementation(() => { });
//     await wrapper.find("[data-test=\"next_button\"]").trigger("click");
//     await expect(window.alert).toBeCalled;
//   });

//   it("mocking한 router함수로 라우팅이 잘 동작하는가에 대한 테스트", async () => {
//     await resetPwApiFunctions.checkAuthCode();
//     await wrapper.find("[data-test=\"next_button\"]").trigger("click");
//     setTimeout(() => {
//       expect(mockRouter.push).toHaveBeenCalledTimes(1);
//       expect(mockRouter.push).toHaveBeenCalledWith("/resetPw");
//     }, 100);
//   });
// });
