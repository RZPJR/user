export default [
    {
        path: '/user/user',
        name: 'User',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'User List',
        }
    },
    {
        path: '/user/user/create',
        name: 'UserCreate',
        component: () => import("./Create.vue"),
        meta: {
            auth: true,
            title: 'User Create',
            breadcrumbs : [
                {
                    text: 'User',
                    to : '/user/user'
                },
                {
                    text: 'Create User'
                },
            ],
        }
    },
    {
        path: '/user/user/reset-password/:id',
        name: 'UserResetPassword',
        component: () => import("./ResetPassword.vue"),
        meta: {
            auth: true,
            title: 'User Reset Password',
            breadcrumbs : [
                {
                    text: 'User',
                    to : '/user/user'
                },
                {
                    text: 'User Detail',
                    to : '/user/user/detail/:id'
                },
                {
                    text: 'Reset Password'
                },
            ],
        }
    },
    {
        path: '/user/user/detail/:id',
        name: 'UserDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'User Detail',
            breadcrumbs : [
                {
                    text: 'User',
                    to : '/user/user'
                },
                {
                    text: 'User Detail',
                },
            ],
        }
    },
    {
        path: '/user/user/update/:id',
        name:'UserUpdate',
        component: () => import("./Update.vue"),
        meta: {
            auth: true,
            title: 'User Update',
            breadcrumbs : [
                {
                    text: 'User',
                    to : '/user/user'
                },
                {
                    text: 'Detail User',
                    to : '/user/user/detail/:id'
                },
                {
                    text: 'Update User'
                },
            ],
        },
        props: true,
    },
]