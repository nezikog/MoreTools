import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import("../pages/Home.vue")
const Login = () => import("../pages/Login.vue")
const Registration = () => import("../pages/Registration.vue")
const Qr = () => import("@/pages/qr.vue")
const Pass = () => import("@/pages/pass.vue")
const Avatar = () => import("@/pages/avatar.vue")
const Name = () => import("@/pages/name.vue")

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: '/home',
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
  },
  {
    path: '/qr',
    name: 'qr',
    component: Qr
  },
  {
    path: '/pass',
    name: 'pass',
    component: Pass
  },
  {
    path: '/avatar',
    name: 'avatar',
    component: Avatar
  },
  {
    path: '/name',
    name: 'name',
    component: Name
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
