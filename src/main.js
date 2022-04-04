import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/Routes'
// import { Routes } from './router/Routes'
import {store} from './store/store'
import axios  from 'axios'
// import 'animate.css';


Vue.config.productionTip = false

Vue.use(VueRouter);


axios.defaults.baseURL = 'https://alaatv.com/api/v2';



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
