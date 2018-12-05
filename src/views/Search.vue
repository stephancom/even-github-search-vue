<template lang="pug">
  .search
    b-row
      b-col
        h1.heading Even Financial GitHub Repository Search
    b-row
      h3.debug {{ debug }}
    b-row
      b-col
        b-form(@submit="onSubmit" @reset="onReset")
          b-row
            b-form-group.col(label='Text' label-for='text')
              b-form-input(id='text' type='text' v-model='form.text' placeholder='react')
            b-form-group.col(label='Stars' label-for='stars')
              //- ^\s*(<|>|>=|<=)?(\*?|\d*)(\.{2,3}(\*?|\d+))?\s*$
              b-form-input(id='stars' type='text' v-model='form.stars' placeholder='>100' pattern='\s*(<|>|>=|<=)?(\*?|\d*)(\.{2,3}(\*?|\d+))?\s*')
          b-row
            b-form-group.col(label='License' label-for='license')
              b-form-select(id='license' :options='licenses' v-model='form.license')
            b-form-group.col
              b-form-checkbox(id='fork' v-model='form.fork') Include Fork
          b-row
            b-col.footer
              b-button(type='submit' variant='primary') Search

    hr
    b-row
      b-col Please enter query and click SEARCH above, results appear here
</template>

<script>
// https://developer.github.com/v3/search/#search-repositories
const axios = require('axios');
var httpx = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 4000,
  headers: { 'Accept': 'application/vnd.github.v3+json' }
})
const searchPath = '/search/repositories';
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    console.log('reqerr');
    console.log(error);
    return Promise.reject(error);
  });

export default {
  name: "search",
  data () {
    return {
      form: {
        text: '',
        stars: '',
        license: null,
        fork: []
      },
      licenses: ['', 'MIT', 'ISC', 'Apache', 'GPL'],
      debug: 'starting'
    }
  },
  methods: {
    onSubmit (evt) {
      this.debug = 'onSubmit';

      var q = [];
      for(var key in this.form) {
        if(this.form[key] && /\S/.test(this.form[key])) {
          var param = encodeURIComponent(this.form[key].trim());
          if(key != 'text') { param = key + ':' + param }
          q.push(param)
        }
      }
      this.debug = '?q=' + q.join('+');
      var params = { q: q.join('+') }
      this.debug = params;
      this.debug = 'starting';
      httpx.get(searchPath, { params: params })
        .then( (response) => {
          console.log('response');
          this.debug = 'response!';
          this.debug = response;
        })
        .catch( (error) => {
          console.log('catch');
          console.log(error);
          this.debug = 'error :(';
          this.debug = error;
        })
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
