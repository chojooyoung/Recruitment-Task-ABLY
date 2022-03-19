import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("Hello World 컴포넌트에 'Recruitment task' 글자가 잘 출력이 되는가?", () => {
    const msg = "Recruitment task";
    const wrapper = shallowMount(HelloWorld, {});
    expect(wrapper.text()).toMatch(msg);
  });
});
