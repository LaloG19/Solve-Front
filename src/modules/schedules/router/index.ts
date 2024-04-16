export default{
    name:'schedules',
    path:'/schedules',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/schedules/views/SchedulesView.vue'),
    redirect: '/schedules/listado/',
    children:[
        {
            path:'listado/',
            name: 'schedulesList',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/schedules/views/SchedulesView.vue'),
        }
    ]
}