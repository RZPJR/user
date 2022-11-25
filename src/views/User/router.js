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
    // {
    //     path: '/user/user/update/permission/:id',
    //     name:'UserUpdatePermission',
    //     component: () => import("./UpdatePermission"),
    //     meta: {
    //         auth: true,
    //         title: 'User Update Permission',
    //         breadcrumbs : [
    //             {
    //                 text: 'User',
    //                 to : '/user/user'
    //             },
    //             {
    //                 text: 'Detail User',
    //                 to : '/user/user/detail/:id'
    //             },
    //             {
    //                 text: 'Update Permission'
    //             },
    //         ],
    //     },
    //     props: true,
    // },
]