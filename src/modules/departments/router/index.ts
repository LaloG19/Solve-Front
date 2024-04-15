export default{
    name:'departments',
    path:'/departments',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/departments/views/DepartmentsView.vue'),
    redirect: '/departments/listado/',
    children:[
        {
            path:'listado/',
            name: 'departmentsList',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/departments/views/DepartmentsView.vue'),
        }
    ]
}