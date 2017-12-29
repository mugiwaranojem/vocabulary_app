import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Vocabulary from '@/components/Vocabulary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/vocabulary',
    	name: 'Vocabulary',
    	component: Vocabulary
    }
  ]
})
