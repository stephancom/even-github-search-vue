import { shallowMount } from "@vue/test-utils";
const flushPromises = require('flush-promises');

import Search from "@/components/Search.vue";

const defaultSearchProps = {
  topic: null,
  stars: null,
  license: null,
  fork: null
}

const searchFactory = (searchProps) => {
  var mergedSearchProps = {...defaultSearchProps, ...searchProps};
  return shallowMount(Search, { propsData: mergedSearchProps });
}

describe("Search.vue", () => {
  describe("with empty fields", () => {
    const emptySearch = searchFactory({});
    it("should prompt for input", async () => {
      await flushPromises();
      expect(emptySearch.text()).toMatch("Please enter query and click SEARCH above, results appear here");
    });
    it("should not have results", async () => {
      await flushPromises();
      expect(emptySearch.text()).not.toMatch("SEARCH results");
    });
  });
});
