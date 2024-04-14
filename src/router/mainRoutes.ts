import { type RouteRecordRaw } from 'vue-router';

const mainRoutes: Array<RouteRecordRaw> = [
  {
    name: 'main',
    path: '/main',
    component: () => import(/* webpackChunkName: "layout"*/ '@/views/LayoutView.vue'),
    redirect: '/dashboard/',
    children:[
      {
        path:'dashboard/',
        name: 'dashboard',
        component: ()=> import(/* webpackChunkName: "listado"*/ '@/views/DashboardView.vue'),
      },
      {
        path:'*',
        redirect: '/main/dashboard/'
      }
    ]
  }
];

export default mainRoutes;
