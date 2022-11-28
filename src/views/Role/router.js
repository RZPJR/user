export default [
    {
        path: '/user/role',
        name: 'Role',
        component: () => import("./Index.vue"),
    },
    {
        path: '/user/role/detail/:id',
        name: 'RoleDetail',
        component: () => import("./Detail"),
    },
    {
        path: '/user/role/update/:id',
        name:'RoleUpdate',
        component: () => import("./Update"),
    },
    {
        path: '/user/role/create',
        name: 'RoleCreate',
        component: () => import("./Create"),
    },
]