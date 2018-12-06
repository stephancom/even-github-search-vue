<template lang="pug">
  b-row.mt-4
    b-col.col-md-8.border.p-3
      b-row.pt-3
        b-col
          b-button.float-right(v-if='repo.fork' size='sm' variant='primary') Forked
          a(:href="repo.url") {{ repo.full_name }}
      b-row.pt-3
        b-col
          p {{ repo.description }}
    b-col.col-md-2.border.py-4.text-center
      b-row
        b-col Stars:
      b-row
        b-col.detail
          a(href="repo.stargazers_url") {{ repo.stargazers_count }}
    b-col.col-md-2.border.py-4.text-center
      b-row
        b-col License:
      b-row
        b-col.detail
          a(v-if="repo.license" href="repo.license.url") {{ repo.license.name }}
          span(v-else) NONE
</template>

<script>
  export default {
    name: 'repository',
    props: [ 'repo' ]
  }
</script>

<style lang="sass" scoped>
  $even: #377CBE
  a
    color: $even
  .detail
    padding-top: 1em
    > a, > span
      font-weight: bold
      color: grey
</style>