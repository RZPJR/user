export default [
    {
        path: '/user/division',
        name: 'Division',
        component: () => import("./Index.vue"),
    },
    {
        path: '/user/division/create',
        name: 'DivisionCreate',
        component: () => import("./Create"),
    },
    {
        path: '/user/division/update/:id',
        name:'DivisionUpdate',
        component: () => import("./Update.vue"),
    },
]