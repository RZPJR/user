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
    // Deleted Soon (Only for tester)
    {
        path: '/user/permission/component',
        name: 'PermissionComponent',
        component: () => import("./Component.vue"),
        meta: {
            auth: true,
            title: 'Test Component'
        }
    },
]