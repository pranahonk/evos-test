import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import infiniteScroll from 'vue-infinite-scroll'
import App from './App.vue'
import router from '@/router/router'

Vue.config.productionTip = false


Vue.use(infiniteScroll);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
