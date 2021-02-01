/* eslint-disable */
import Vue from 'vue'
import App from './App'
import { rtdbPlugin } from 'vuefire'


import VueModalTor from 'vue-modaltor'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


Vue.use(VueSidebarMenu)
Vue.use(VueModalTor)
Vue.use(rtdbPlugin)


import router from './router'

Vue.config.productionTip = false

  
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
