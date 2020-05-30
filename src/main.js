// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import VueFire from '/Users/ankasulevic/Downloads/bookstore-master/node_modules/vuefire/dist/vuefire'
import VueModalTor from 'vue-modaltor'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


Vue.use(VueSidebarMenu)
Vue.use(VueModalTor)




Vue.use(VueFire)

import router from './router'

Vue.config.productionTip = false

  
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
