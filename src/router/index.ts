import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import LayoutView from '@/views/LayoutView.vue'
import DepartmentsView from '@/modules/departments/views/DepartmentsView.vue'
import LoginView from '@/modules/login/views/LoginView.vue'

import absencesRoutes from '@/modules/absences/router/index'
import departmentsRoutes from '@/modules/departments/router/index'
import employeesRoutes from '@/modules/employees/router/index'
import positionsRoutes from '@/modules/positions/router/index'
import schedulesRoutes from '@/modules/schedules/router/index'  
import Swal from 'sweetalert2'

const routes: Array<RouteRecordRaw> = [
  { /* Login, ruta principal, sección de rutas sin layout */
    path: '/login',
    name: 'login',
    component: LoginView
  },
  { /* rutas con layout, ruta principal: dashboard */
    path: '/',
    name: 'main',
    redirect: { name: 'login' },
    meta: {
      requiresAuth: true
    },
    children:[
      {
        path:'dashboard',
        name: 'dashboard',
        component: DashboardView,
      },
      {
        path: 'absences',
        ...absencesRoutes
      },
      {
        path: 'departments',
        ...departmentsRoutes
      },
      {
        path: 'employees',
        ...employeesRoutes
      },
      {
        path: 'positions',
        ...positionsRoutes
      },{
        path: 'schedules',
        ...schedulesRoutes
      },
      { /* Ruta 404, en caso de no encontar /main/algo regresa al dashboard */
        path: '/:catchAll(.*)',
        redirect: { name: 'employees' }
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


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let credentials = JSON.parse(localStorage.getItem('credentials'));

    if ( (credentials ? credentials.adminID : 0) === 0 ) {
      Swal.fire({
        title: 'Error',
        text: 'No tienes permisos para acceder a esta sección',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#A22522',
      });
      
      next({ name: 'login' });
    } else {
      console.log('[routes] El adminID es: ' + credentials.adminID);
      next();
    }
  } else {
    next();
  }
});

export default router