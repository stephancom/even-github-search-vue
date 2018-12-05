<template lang="pug">
  b-row
    b-col.col-md-8
      b-row
        b-col
          a.button.pull-right(v-if="repo.fork" href="repo.forks_url") Forked
          a(:href="repo.url") {{ repo.full_name }}
      b-row
        b-col
          p {{ repo.description }}
    b-col.col-md-2
      b-row
        b-col
          p Stars:
      b-row
        b-col
          em
            a(href="repo.stargazers_url") {{ repo.stargazers_count }}
    b-col.col-md-2
      b-row
        b-col
          p License:
      b-row
        b-col
          em
            a(href="repo.license.url") {{ repo.license.name }}
</template>

<script>
  export default {
    name: 'repository',
    props: [ 'repo' ]
  }
</script>