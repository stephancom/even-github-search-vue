import Vue from "vue";
import Router from "vue-router";
import Search from "./views/Search.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "search",
      component: Search,
      props: route => ({
        topic: route.query.topic,
        stars: route.query.stars,
        license: route.query.license,
        fork: route.query.fork
      })
    }
  ]
});
