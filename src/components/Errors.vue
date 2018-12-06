<template lang="pug">
  .alert.alert-danger(role='alert')
    h4.alert-heading ERROR: {{ data.message }}
    p.mb-0(v-for="error in data.errors") {{ error.code }}: {{ error.message }}
</template>

<script>
export default {
  name: "errors",
  props: ["data"]
};
</script>
