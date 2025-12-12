import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import("../pages/Home.vue")
const Login = () => import("../pages/Login.vue")
const Registration = () => import("../pages/Registration.vue")

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Registration
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
