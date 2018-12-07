<template lang="pug">
b-container
  b-row
    b-col
      b-form(@submit.prevent="onSubmit")
        b-row
          b-form-group.col-md.px-md-4.px-2(label='Text' label-for='topic' invalid-feedback='Cannot be blank')
            b-form-input(id='topic' type='text' v-model='form.topic' placeholder='topic' validated=true v-bind:class="{ 'is-invalid': !topicValid }"  :disabled='searching')
          b-form-group.col-md.px-md-4.px-2(label='Stars' label-for='stars' invalid-feedback='examples: 100, >50, <=200, 100..5000')
            b-form-input(id='stars' type='text' v-model='form.stars' placeholder='stars' validated=true v-bind:class="{ 'is-invalid': !starsValid }"  :disabled='searching')
        b-row
          b-form-group.col-md.px-md-4.px-2(label='License' label-for='license')
            b-form-select(id='license' v-model='form.license'  :options='licenses'  :disabled='searching')
          b-form-group.pt-4.col-md.px-md-4.px-2(size='lg')
            b-form-checkbox(id='fork' v-model='form.fork'  :disabled='searching') Include Forked
        b-row
          b-col.footer
            b-button(type='submit' variant='primary' :disabled='searching') Search

  hr
  b-row
    b-col.text-center.m-5
      img(v-if="this.searching" src="../assets/SpinnyBalls.gif")
      p(v-else)
        errors(v-if="error_response" :data="error_response")
        span(v-else-if="repositories == null") Please enter query and click SEARCH above, results appear here
        span(v-else-if="repositories.length == 0") No results
        span(v-else) SEARCH results
  b-row
    b-col
      repository(v-for='repo in repositories' :repo="repo")
</template>


<script>
import Repository from "@/components/Repository.vue";
import Errors from "@/components/Errors.vue";

// https://developer.github.com/v3/search/#search-repositories
const axios = require("axios").create({
  baseURL: "https://api.github.com/",
  timeout: 4000,
  headers: {
    "User-Agent": "stephancom-even-github-search-vue",
    Accept: "application/vnd.github.v3+json"
  }
});
const searchPath = "/search/repositories";
const starsRegexp = /^\s*(<|>|>=|<=)?(\*?|\d*)(\.{2,3}(\*?|\d+))?\s*$/;

export default {
  name: "search",
  components: { Repository, Errors },
  props: ["topic", "stars", "license", "fork"],
  data() {
    return {
      repositories: null,
      form: {
        topic: "",
        stars: "",
        license: null,
        fork: []
      },
      licenses: ["", "MIT", "ISC", "Apache", "GPL"],
      searching: false,
      error_response: null,
      topicValid: true,
      starsValid: true
    };
  },
  mounted: function() {
    this.results = [];
    this.form.topic = this.topic;
    this.form.stars = this.stars;
    this.form.license = this.license;
    this.form.fork = this.fork;
    if (this.isValid()) {
      this.doSearch();
    } else {
      this.clearValid();
    }
  },
  watch: {
    topic(topic)     { this.form.topic   = topic;   this.doSearch(); },
    stars(stars)     { this.form.stars   = stars;   this.doSearch(); },
    license(license) { this.form.license = license; this.doSearch(); },
    fork(fork)       { this.form.form    = fork;    this.doSearch(); }
  },
  methods: {
    paramOK(key) {
      return this.form[key] && /\S/.test(this.form[key]);
    },
    paramEncode(key) {
      return encodeURIComponent(this.form[key].trim());
    },
    isValid() {
      this.starsValid = this.form.stars == null ||
                        this.form.stars.length < 1 ||
                        starsRegexp.test(this.form.stars);
      // topic can be blank if license or stars are filled in
      this.topicValid = this.form.stars != null ||
                        this.form.license != null ||
                        (this.form.topic != null && this.form.topic.length > 0);

      return this.topicValid && this.starsValid;
    },
    clearValid() { this.starsValid = true; this.topicValid = true; },
    urlParams() {
      var params = {};
      if (this.paramOK("topic"))   { params["topic"] = this.form.topic; }
      if (this.paramOK("stars"))   { params["stars"] = this.form.stars; }
      if (this.paramOK("license")) { params["license"] = this.form.license; }
      if (this.paramOK("fork"))    { params["fork"] = true; }
      return params;
    },
    queryParams() {
      var query = [];
      if (this.paramOK("topic"))   { query.push(this.paramEncode("topic")); }
      if (this.paramOK("stars"))   { query.push("stars:" + this.paramEncode("stars")); }
      if (this.paramOK("license")) { query.push("license:" + this.paramEncode("license")); }
      if (this.paramOK("fork"))    { query.push("fork:true"); }
      return query;
    },
    onSubmit() {
      this.isValid();
      this.$router.push({ name: "home", query: this.urlParams() });
    },
    doSearch() {
      if (!this.isValid()) { return; }
      var q = this.queryParams();
      this.repositories = [];
      this.searching = true;
      this.error_response = null;

      // RIGHT (but GitHub expects something weird)
      // axios.get(searchPath, { params: { q: q.join('+') } })
      // WRONG (but it works)
      axios
        .get(searchPath + "?q=" + q.join("+"))
        .then(response => {
          this.repositories = response.data.items;
        })
        .catch(error => {
          this.repositories = null;
          this.error_response = error["response"]["data"];
        })
        .then(() => {
          this.searching = false;
        });
    }
  }
};
</script>

<style scoped lang="sass">
  form 
    .form-group
      padding-left: 5em
      padding-right: 5em
</style>
