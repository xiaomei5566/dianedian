import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods'

//安装vue插件(router插件) 即注册
Vue.use(Router)

//定义路由
const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: goods
  }
]

//创建router实例并传参
export default new Router({
  linkActiveClass: 'active',
  routes
})
