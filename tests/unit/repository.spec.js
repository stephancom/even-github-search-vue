import { shallowMount } from "@vue/test-utils";
import Repository from "@/components/Repository.vue";

const defaultRepoProps = {
  full_name: "default-coder/default-repo",
  html_url: "http://github.com/some_dev/this-repo",
  description: "default description",
  stargazers_count: 0,
  license: {
    name: "default",
  },
  fork: false
};

const repoFactory = (repoProps) => {
  const mergedRepoProps = {...defaultRepoProps, ...repoProps};
  return shallowMount(Repository, { propsData: { repo: mergedRepoProps }});
}

describe("Repository.vue", () => {
  it("renders repo.full_name when passed", () => {
    expect(repoFactory({full_name: 'swedish-chef/bork-bork-bork'}).text()).toMatch("swedish-chef/bork-bork-bork");
  });
  it("renders the html url", () => {
    expect(repoFactory({html_url: "http://github.com/some_dev/this-repo"}).contains('a[href="http://github.com/some_dev/this-repo"]')).toBe(true);
  });
  it("renders the description", () => {
    expect(repoFactory({description: "compute all the things"}).text()).toMatch("compute all the things");
  });
  it("renders the number of stars", () => {
    expect(repoFactory({stargazers_count: 42}).text()).toMatch("42");
  });
  it("renders the license name", () => {
    expect(repoFactory({license: {name: "Arizona Chill License"}}).text()).toMatch("Arizona Chill License");
  });

  describe("unforked repo", () => {
    const unforkedRepo = repoFactory({fork: false});
    it("does NOT contain a fork button", () => {
      expect(unforkedRepo.text()).not.toMatch("Forked");
    });
    it("has no buttons", () => {
      expect(unforkedRepo.contains("b-button-stub")).toBe(false);
    });
    it("matches snapshot", () => {
      expect(unforkedRepo.html()).toMatchSnapshot();
    })
  });

  describe("forked repo", () => {
    var forkedRepo = repoFactory({fork: true});
    it("contains forked text", () => {
      expect(forkedRepo.text()).toMatch("Forked");
    });
    it("contains a button", () => {
      expect(forkedRepo.contains("b-button-stub")).toBe(true);
    });
    it("contains a forked button", () => {
      expect(forkedRepo.find("b-button-stub").text()).toMatch("Forked");
    });
    it("matches snapshot", () => {
      expect(forkedRepo.html()).toMatchSnapshot();
    })
  })
})
