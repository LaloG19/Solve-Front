import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LayoutView from '@/shared/LayoutView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },{
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayoutView
  },
  
  
  
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
