<template lang="pug">
  b-row.mb-4.px-4.px-md-0
    b-col.col-md-8.col-12.border.p-3
      b-row.pt-3
        b-col
          b-button.float-right(v-if='repo.fork' size='sm' variant='primary') Forked
          a(:href="repo.html_url" target='_blank') {{ repo.full_name }}
      b-row.pt-3
        b-col
          p {{ repo.description }}
    b-col.col-md-2.col-12.border.py-4.text-center
      b-row
        b-col.col-auto.col-md-12 Stars:
        b-col.col-auto.col-md-12.pt-md-2.detail
          a(href="repo.stargazers_url") {{ repo.stargazers_count }}
    b-col.col-md-2.col-12.border.py-4.text-center
      b-row
        b-col.col-auto.col-md-12 License:
        b-col.col-auto.col-md-12.pt-md-2.detail
          a(v-if="repo.license" href="repo.license.url") {{ repo.license.name }}
          span(v-else) NONE
</template>

<script>
export default {
  name: "repository",
  props: ["repo"]
};
</script>

<style lang="sass" scoped>
  $even: #377CBE
  a
    color: $even
  .detail
    > a, > span
      font-weight: bold
      color: grey
</style>
