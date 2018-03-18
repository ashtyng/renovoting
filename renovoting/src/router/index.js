import Vue from 'vue'
import Router from 'vue-router'
import Voting from '@/components/Voting'
import Imgs from '@/components/Imgs'

Vue.use(Router)

export default new Router({
  routes: [
        {
    	path: '/vote',
    	name: 'Imgs',
    	component: Imgs
    },
    {
      path: '/',
      name: 'Voting',
      component: Voting
    }
  ]
})
