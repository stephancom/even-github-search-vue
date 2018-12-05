<template lang="pug">
  b-row.mt-4
    b-col.col-md-8.border.p-2
      b-row
        b-col
          button.btn.btn-primary.float-right(v-if="repo.fork") Forked
          a(:href="repo.url") {{ repo.full_name }}
      b-row
        b-col
          p {{ repo.description }}
    b-col.col-md-2.border.p-2.text-center
      b-row
        b-col
          p Stars:
      b-row
        b-col
          b
            a(href="repo.stargazers_url") {{ repo.stargazers_count }}
    b-col.col-md-2.border.p-2.text-center
      b-row
        b-col
          p License:
      b-row
        b-col
          b
            a(v-if="repo.license" href="repo.license.url") {{ repo.license.name }}
            span(v-else) NONE
</template>

<script>
  export default {
    name: 'repository',
    props: [ 'repo' ]
  }
</script>