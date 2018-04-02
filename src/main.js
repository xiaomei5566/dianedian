// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router/index'

import '../static/css/reset.css'
import 'common/stylus/index.styl'

/*Vue.config.productionTip = false*/

/* eslint-disable no-new */

Vue.use(VueResource)

//创建构造器
let app = Vue.extend(App)

// render通过JS语法来初始化一个模板, h对应一个createElement() 此方法可创建元素节点。来渲染app
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})


