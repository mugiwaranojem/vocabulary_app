<template>
  <div id="app">
    <Timer/>
    <router-view/>

    {{ checkTime() }}
  </div>
</template>

<script>
import Vocabulary from '@/components/Vocabulary' 
import Timer from './components/Timer' 

export default {
  name: 'app',
  components: {
    Vocabulary,
    Timer
  },
  methods: {
      checkTime() {
        let myTimer =  Timer.data()
      }
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
