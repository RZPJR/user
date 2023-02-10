export default [
    {
        path: '/user/division',
        name: 'Division',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Division List'
        }
    },
    {
        path: '/user/division/create',
        name: 'DivisionCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Division Create',
            breadcrumbs : [
                {
                    text: 'Division',
                    to : '/user/division'
                },
                {
                    text: 'Division Create'
                }
            ],
        },
    },
    {
        path: '/user/division/update/:id',
        name:'DivisionUpdate',
        component: () => import("./Update.vue"),
        meta: {
            auth: true,
            title: 'Division Update',
            breadcrumbs : [
                {
                    text: 'Division',
                    to : '/user/division'
                },
                {
                    text: 'Division Update'
                }
            ],
        },
        props: true,
    },
]