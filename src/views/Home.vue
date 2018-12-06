<template lang="pug">
  b-container
    b-row
      b-col
        h1.heading Even Financial GitHub Repository Search
    search(:topic="topic"  :stars="stars"  :license="license"  :fork="fork")
</template>

<script>
import Search from "@/components/Search.vue"

export default {
  name: "home",
  components: {
    Search
  },
  props: ["topic", "stars", "license", "fork"],
};
</script>

<style scoped lang="sass">
  h1.heading, .footer
    padding: 2em 0
    text-align: center
</style>
