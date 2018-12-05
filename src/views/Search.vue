<template lang="pug">
  b-container.search
    b-row
      b-col
        h1 Even Financial GitHub Repository Search
    b-form(@submit="onSubmit" @reset="onReset")
      b-form-row
        b-col
          b-form-input(id='text' type='text' v-model='form.q' placeholder='react')
        b-col
          b-form-input(id='stars' type='text' v-model='form.stars' placeholder='>100')
      b-form-row
        b-col
          b-form-select(id='license' :options='licenses' v-model='form.license')
        b-col
          b-form-checkbox(id='forked' v-model='form.forked')
      b-form-row
        b-col
          b-button(type='submit' variant='primary') Search

    hr
    b-row
      b-col Please enter query and click SEARCH above, results appear here
</template>

<script>
export default {
  name: "search",
  data () {
    return {
      form: {
        text: '',
        stars: '',
        license: null,
        forked: []
      },
      licenses: ['', 'MIT', 'ISC', 'Apache', 'GPL']
    }
  },
  methods: {
    onSubmit (evt) {
      // TODO
    },
    onReset (evt) {
      // TODO
    }
  }
};
</script>
