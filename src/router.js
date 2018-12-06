import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: route => ({
        topic: route.query.topic,
        stars: route.query.stars,
        license: route.query.license,
        fork: route.query.fork
      })
    }
  ]
});
