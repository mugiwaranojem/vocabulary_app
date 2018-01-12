// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import words from './words'
import vueResource from 'vue-resource'
import firebase from 'firebase'
import vuefire from 'vuefire'

var config = {
  apiKey: 'AIzaSyARAEjq5ieaC4pa7TXKdM8wKu-uWFx0pRU',
  authDomain: 'test-api-43443.firebaseapp.com',
  databaseURL: 'https://test-api-43443.firebaseio.com',
  projectId: 'test-api-43443',
  storageBucket: 'test-api-43443.appspot.com',
  messagingSenderId: '747768745089'
}

Vue.prototype.$db = firebase.initializeApp(config).database()

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(vuefire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})