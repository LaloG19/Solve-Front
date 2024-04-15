import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import LayoutView from '@/views/LayoutView.vue'
import DepartmentsView from '@/modules/departments/views/DepartmentsView.vue'

import LoginView from '@/modules/login/views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  { /* Login, ruta principal, sección de rutas sin layout */
    path: '/login',
    name: 'login',
    component: LoginView
  },
  { /* rutas con layout, ruta principal: dashboard */
    path: '/',
    name: 'main',
    redirect: { name: 'dashboard' },
    children:[
      {
        path:'dashboard/',
        name: 'dashboard',
        component: DashboardView,
      },
      { /* Ruta 404, en caso de no encontar /main/algo regresa al dashboard */
        path: '/:catchAll(.*)',
        redirect: { name: 'dashboard' }
      }
    ]
  },
  {       /* Ruta de prueba, eliminar cuando el layout sea establecido */
    path: '/layout',
    name: 'layout',
    component: LayoutView
  },
  {       /* Ruta de prueba, eliminar cuando el layout sea establecido */
    path: '/departments',
    name: 'departments',
    component: DepartmentsView
  },
  { /* Ruta 404, en caso de no encontrar la ruta solicitada, regresa al login */
    path: '/:catchAll(.*)',
    redirect: { name: 'login' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router