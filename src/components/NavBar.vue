<template lang="pug">
b-navbar(toggleable='md' type='dark' variant='primary')
  b-navbar-toggle(target='nav_collapse')
  b-navbar-brand(href='#')
    img.d-inline-block(alt="Vue logo" src="../assets/logo.png" height="20")
  b-collapse#nav_collapse(is-nav='')
    b-navbar-nav
      b-nav-item(to='/') Home
      b-nav-item(to='/search') Search
      b-nav-item(to='/about') About
</template>

<script>
export default {
  name: "NavBar"
};
</script>