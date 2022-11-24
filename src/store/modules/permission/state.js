const state = {
    permissionList: {
        search: '',
        isLoading: false,
        status:1,
        filter : false,
        tableHeaders: [
            {
                text:'Name',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Value',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Status',
                class: 'grey--text text--darken-4',
                sortable: false
            },
        ],
        data:[],
    }
}

export default state;