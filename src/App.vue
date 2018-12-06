<template lang="pug">
#app
  NavBar
  b-container
    router-view
</template>

<script>

import NavBar from "@/components/NavBar.vue";

export default {
  name: "search",
  components: {
    NavBar
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  $even: #377CBE;
  .bg-primary {
    background-color: $even!important; 
  }
  .btn-primary {
    background-color: $even;
    border-color: darken($even, 10%);
    &:hover {
      background-color: lighten($even, 10%);
      border-color: $even;
    }
  }
}
</style>
