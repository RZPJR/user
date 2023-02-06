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
                width: "50%",
                sortable: false
            },
            {
                text:'Value',
                class: 'grey--text text--darken-4',
                width: "45%",
                sortable: false
            },
            {
                text:'Status',
                class: 'grey--text text--darken-4',
                width: "5%",
                sortable: false
            },
        ],
        data:[],
    }
}

export default state;