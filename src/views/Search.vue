<template lang="pug">
  .search
    b-row
      b-col
        h1.heading Even Financial GitHub Repository Search
    b-row
      b-col
        b-form(@submit="onSubmit" @reset="onReset")
          b-row
            b-form-group.col(label='Text' label-for='text')
              b-form-input(id='text' type='text' v-model='form.q' placeholder='react')
            b-form-group.col(label='Stars' label-for='stars')
              //- ^\s*(<|>|>=|<=)?(\*?|\d*)(\.{2,3}(\*?|\d+))?\s*$
              b-form-input(id='stars' type='text' v-model='form.stars' placeholder='>100' pattern='\s*(<|>|>=|<=)?(\*?|\d*)(\.{2,3}(\*?|\d+))?\s*')
          b-row
            b-form-group.col(label='License' label-for='license')
              b-form-select(id='license' :options='licenses' v-model='form.license')
            b-form-group.col
              b-form-checkbox(id='forked' v-model='form.forked') Include Forked
          b-row
            b-col.footer
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

<style scoped lang="sass">
  .search
    h1.heading, .footer
      padding: 2em 0
      text-align: center
    form 
      .form-group
        padding-left: 5em
        padding-right: 5em
</style>
