export default{
    name:'positions',
    path:'/positions',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/positions/views/PositionsView.vue'),
    redirect: 'positions/listado/',
    children:[
        {
            path:'listado/',
            name: 'positionsList',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/positions/views/PositionsView.vue'),
        }
    ]
}