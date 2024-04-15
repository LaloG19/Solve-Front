export default{
    name:'absences',
    path:'/absences',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/absences/views/AbsencesView.vue'),
    redirect: '/absences/listado/',
    children:[
        {
            path:'listado/',
            name: 'absencesList',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/absences/views/AbsencesView.vue'),
        }
    ]
}