import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import flushPromises from "flush-promises";
import mockAxios from "jest-mock-axios";

import Search from "@/components/Search.vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

shallowMount(Search, {
  localVue,
  router
})

const defaultSearchProps = {
  topic: null,
  stars: null,
  license: null,
  fork: null
}

const searchFactory = (searchProps) => {
  var mergedSearchProps = {...defaultSearchProps, ...searchProps};
  return shallowMount(Search, { localVue, router, propsData: mergedSearchProps });
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
  describe("with topic", () => {
    const topicSearch = searchFactory({topic: "react"});
    it.only("hits github", () => {
      const result = topicSearch.vm.onSubmit();
      expect(mockAxios.get).toBeCalledWith('http://foo')
    })
  })
});








  // describe("with props", () => {
  //   it.only("should fill in topic", async () => {
  //     await flushPromises();
  //     const topicSearch = searchFactory({topic: "react"});
  //     console.log(topicSearch.html());
  //     console.log(topicSearch.find("#topic[type='text']").html());
  //     console.log(topicSearch.find("#topic[type='text']").attributes());
  //     // console.log(topicSearch.vm.$refs.emailField.currentValue)
  //     // console.log(topicSearch.find("#topic[type='text']").element);
  //     expect(topicSearch.find("#topic").element.value).toMatch("react");
  //   })
  // })
  // it("fetches data from unsplash", async () => {
  //   // setup
  //   mockAxios.get.mockImplementationOnce(() =>
  //     Promise.resolve({
  //       data: { results: ["cat.jpg"] }
  //     })
  //   );

  //   // work
  //   const images = await unsplash("cats");

  //   // expect
  //   expect(images).toEqual(["cat.jpg"]);
  //   expect(mockAxios.get).toHaveBeenCalledTimes(1);
  //   expect(mockAxios.get).toHaveBeenCalledWith(
  //     "https://api.unsplash.com/search/photos",
  //     {
  //       params: {
  //         client_id: process.env.REACT_APP_UNSPLASH_TOKEN,
  //         query: "cats"
  //       }
  //     }
  //   );
  // })