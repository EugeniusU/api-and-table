<template>
  <div id="app">
      <v-main-wrapper/>
  </div>
</template>

<script>
import VMainWrapper from './components/v-main-wrapper.vue'

export default {
  name: 'App',
  components: {
    VMainWrapper
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
/*  margin-top: 60px; */
  

  width: 100%;
  height: 100%;
  position: absolute;
}

body {
  margin: 0;
  padding: 0;
}
</style>
