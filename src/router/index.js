import Vue from 'vue'
import Router from 'vue-router'

import Turntable from '../page/turntable.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Turntable',
      component: Turntable
    }
  ]
})
