import Vue from 'vue'
import App from './App.vue'
import router from './scripts/router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(VueAxios,axios)
Vue.prototype.qs = qs
Vue.config.productionTip = false
Vue.axios.defaults.baseURL = 'http://fwb1314520.gz01.bdysite.com/';

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
