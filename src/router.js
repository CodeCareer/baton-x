import VueRouter from 'vue-router'
import routes from './routers'
import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default {
  run() {
    new Vue({
      render(h) {
        return h(App)
      },
      store,
      router
    }).$mount('#app')
  }
}

export { router }
