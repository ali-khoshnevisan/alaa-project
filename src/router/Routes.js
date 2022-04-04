import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLogin from '../views/AppLogin'
import HomePage from '../views/HomePage'
import UserProfile from '../views/UserProfile'
import UpdateUser from '../views/UpdateUser'
import { store } from '../store/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
    meta: { loginRedirect: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta: { loginRequired: true },
  },
  {
    path: '/Update',
    name: 'Update',
    component: UpdateUser,
    meta: { loginRequired: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loginRequired)) {
      if (store.state.IsUserAuthenticated) {
          next()
      } else {
          next("/login")
      }
  } else if (to.matched.some(record => record.meta.loginRedirect)) {
      store.dispatch("onStart")
      if (!store.state.IsUserAuthenticated) {
          next()
      } else {
          next("/profile")
      }
  } else {
      next()
  }
})

export default router
