<template>
  <div id="app">

    <Vocabulary/>

  </div>
</template>

<script>
import Vocabulary from '@/components/Vocabulary'

export default {
  name: 'app',
  components: {
    Vocabulary
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
