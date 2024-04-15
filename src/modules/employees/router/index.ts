export default{
    name:'employees',
    path:'/employees',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/employees/views/EmployeesView.vue'),
    redirect: '/employees/listado/',
    children:[
        {
            path:'listado/',
            name: 'employeesList',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/employees/views/EmployeesView.vue'),
        }
    ]
}