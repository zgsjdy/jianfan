import App from './App'


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
//导入组件
import navBar from './components/navBar/navBar.vue'
import botNavBar from './components/botNavBar/botNavBar.vue'

export function createApp() {
  const app = createSSRApp(App);
  // 注册全局组件
  app.component('navBarQJ',navBar)
  app.component('botNavBarQJ',botNavBar)
  // 注册pinia
  app.use(Pinia.createPinia());
  return {
    app,
	Pinia
  }
}
// #endif