<template lang="pug">
  .search
    b-row
      b-col
        h1.heading Even Financial GitHub Repository Search
    b-row
      b-col
        b-form(@submit="onSubmit")
          b-row
            b-form-group.col(label='Text' label-for='topic')
              b-form-input(id='topic' type='text' v-model='form.topic' placeholder='topic' :disabled='searching')
            b-form-group.col(label='Stars' label-for='stars')
              //- ^\s*(<|>|>=|<=)?(\*?|\d*)(\.{2,3}(\*?|\d+))?\s*$
              //- b-form-input(id='stars' type='text' v-model='form.stars' placeholder='>100' pattern='\s*(<|>|>=|<=)?(\*?|\d*)(\.{2,3}(\*?|\d+))?\s*' :disabled='searching')
              b-form-input(id='stars' type='text' v-model='form.stars' placeholder='stars' :disabled='searching')
          b-row
            b-form-group.col(label='License' label-for='license')
              b-form-select(id='license' :options='licenses' v-model='form.license' :disabled='searching')
            b-form-group.col
              b-form-checkbox(id='fork' v-model='form.fork' :disabled='searching') Include Fork
          b-row
            b-col.footer
              b-button(type='submit' variant='primary' :disabled='searching') Search

    hr
    b-row
      b-col.text-center.m-5
        img(v-if="this.searching" src="../assets/SpinnyBalls.gif")
        p(v-else)
          errors(v-if="error" :data="error_response")
          span(v-else-if="repositories == null") Please enter query and click SEARCH above, results appear here
          span(v-else-if="repositories.length == 0") No results
          span(v-else) SEARCH results
    b-row
      b-col
        repository(v-for='repo in repositories' :repo="repo")
    b-row
      h3.debug {{ debug }}

</template>

<script>

import Repository from "@/components/Repository.vue";
import Errors from "@/components/Errors.vue";

// https://developer.github.com/v3/search/#search-repositories
const axios = require('axios');
var httpx = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 4000,
  headers: { 
    'User-Agent': 'stephancom-even-github-search-vue',
    'Accept': 'application/vnd.github.v3+json'
  }
  // ,
  // paramsSerializer: (params) => {
  //   console.log('serialize', params);
  //   // var result = '';
  //   // return result;
  //   return Qs.stringify(params, {arrayFormat: 'brackets'}, {encode: false})
  // }
})
const searchPath = '/search/repositories';

httpx.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("intercept before")
    console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    console.log("intercept error")
    console.log(error);
    return Promise.reject(error);
  });

export default {
  name: "search",
  components: {
    Repository,
    Errors
  },
  data () {
    return {
      repositories: null,
      form: {
        text: '',
        stars: '',
        license: null,
        fork: []
      },
      licenses: ['', 'MIT', 'ISC', 'Apache', 'GPL'],
      searching: false,
      error: false,
      error_response: null,
      debug: 'starting'
    }
  },
  methods: {
    paramOK(key) {
      return this.form[key] && /\S/.test(this.form[key]);
    },
    paramEncode(key) {
      // return encodeURIComponent(this.form[key].trim());
      return encodeURIComponent(this.form[key].trim());
    },
    onSubmit (evt) {
      this.debug = 'onSubmit';
      this.repositories = [];
      this.searching = true;
      this.error = false;
      this.error_response = null;
      var q = [];
      // for(var key in this.form) {
      //   if(this.paramOK(key)) {
      //     q.push(key + ':"' + this.paramEncode(key) + '"')
      //   }
      //   console.log(q);
      // }
      if(this.paramOK('topic')) { q.push(this.paramEncode('topic')) }
      if(this.paramOK('stars')) { q.push('stars:' + this.paramEncode('stars')) }
      if(this.paramOK('license')) { q.push('license:' + this.paramEncode('license')) }
      if(this.paramOK('form')) { q.push('fork:true') }
      // if(this.paramOK('topic')) { q.push(this.form.topic.trim()) }
      // if(this.paramOK('stars')) { q.push('stars:"' + this.form.stars + '"') }
      // if(this.paramOK('license')) { q.push('license:' + this.form.license) }
      // if(this.paramOK('form')) { q.push('fork:true') }

      console.log({ params: { q: q.join('+') } })

      // RIGHT (but GitHub expects something weird)
      // httpx.get(searchPath, { params: { q: q.join('+') } })
      // WRONG (but it works)
      httpx.get(searchPath + '?q=' + q.join('+'))
        .then( (response) => {
          this.repositories = response.data.items;
        })
        .catch( (error) => {
          this.repositories = null;
          this.searching = false;
          this.error = true;
          this.error_response = error['response']['data'];
          console.log('catch');
          console.log(error);
          console.log(error.response);
          console.log(error['response']);
          console.log(error['response']['data']);
          this.debug = 'error :(';
          this.debug = error.response.data;
        })
        .then( () => {
          this.searching = false;
        })
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
