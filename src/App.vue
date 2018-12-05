<template lang="pug">
#app
  b-navbar(toggleable='md' type='dark' variant='info')
    b-navbar-toggle(target='nav_collapse')
    b-navbar-brand(href='#') NavBar
    b-collapse#nav_collapse(is-nav='')
      b-navbar-nav
        b-nav-item(href='#') Link
        b-nav-item(href='#' disabled='') Disabled
      // Right aligned nav items
      b-navbar-nav.ml-auto
        b-nav-form
          b-form-input.mr-sm-2(size='sm' type='text' placeholder='Search')
            b-button.my-2.my-sm-0(size='sm' type='submit') Search
        b-nav-item-dropdown(text='Lang' right='')
          b-dropdown-item(href='#') EN
          b-dropdown-item(href='#') ES
          b-dropdown-item(href='#') RU
          b-dropdown-item(href='#') FA
        b-nav-item-dropdown(right='')
          // Using button-content slot
          template(slot='button-content')
            em User
          b-dropdown-item(href='#') Profile
          b-dropdown-item(href='#') Signout
  #nav
    router-link(to='/') Home
    |  |
    router-link(to='/about') About
  router-view

</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
