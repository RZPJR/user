export default [
    {
        path: '/user/permission',
        name: 'Permission',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Permission List'
        }
    },
]