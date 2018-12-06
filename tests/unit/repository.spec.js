import { shallowMount } from "@vue/test-utils";
import Repository from "@/components/Repository.vue";

describe("Repository.vue", () => {
  const repo = {
    full_name: "boring-coder/some-old-repo",
    html_url: "http://github.com/some_dev/this-repo", // which really should match full_name
    description: "compute all the things",
    stargazers_count: "42",
    license: {
      name: "Arizona Chill License",
    },
    fork: false
  };
  const wrapper = shallowMount(Repository, { propsData: { repo: repo }});
  it("renders repo.full_name when passed", () => {
    expect(wrapper.text()).toMatch("boring-coder/some-old-repo");
  });
  it("renders the html url", () => {
    expect(wrapper.contains('a[href="http://github.com/some_dev/this-repo"]')).toBe(true);
  });
  it("renders the description", () => {
    expect(wrapper.text()).toMatch("compute all the things");
  });
  it("renders the number of stars", () => {
    expect(wrapper.text()).toMatch("42");
  });
  it("renders the license name", () => {
    expect(wrapper.text()).toMatch("Arizona Chill License");
  });
  it("does NOT contain a fork button", () => {
    expect(wrapper.text()).not.toMatch("Forked");
  });
  it("has no buttons", () => {
    expect(wrapper.contains("b-button-stub")).toBe(false);
  });

  describe("forked repo", () => {
    var forkedRepo = repo;
    var forkedWrapper;
    beforeAll(() => {
      forkedRepo.fork = true
      forkedWrapper = shallowMount(Repository, { propsData: { repo: forkedRepo }});
    });
    it("contains forked text", () => {
      expect(forkedWrapper.text()).toMatch("Forked");
    });
    it("contains a button", () => {
      expect(forkedWrapper.contains("b-button-stub")).toBe(true);
    });
    it("contains a forked button", () => {
      expect(forkedWrapper.find("b-button-stub").text()).toMatch("Forked");
    });
  })
})
