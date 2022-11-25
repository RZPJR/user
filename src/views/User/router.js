export default [
    {
        path: '/user/user',
        name: 'User',
        component: () => import("./Index.vue"),
    },
    {
        path: '/user/user/create',
        name: 'UserCreate',
        component: () => import("./Create.vue"),
    },
    {
        path: '/user/user/reset-password/:id',
        name: 'UserResetPassword',
        component: () => import("./ResetPassword.vue"),
    },
    {
        path: '/user/user/detail/:id',
        name: 'UserDetail',
        component: () => import("./Detail.vue"),
    },
    {
        path: '/user/user/update/:id',
        name:'UserUpdate',
        component: () => import("./Update.vue"),
    },
]