const state = {
    division_list: {
        search: '',
        loading: false,
        statuses: 1,
        filter : false,
        showFilter : false,
        table: {
            fields: [
                {
                    text:'Code',
                    class: 'grey--text text--darken-4',
                    width: '15%',
                    sortable: false
                },
                {
                    text:'Name',
                    class: 'grey--text text--darken-4',
                    width: '35%',
                    sortable: false
                },
                {
                    text:'Note',
                    class: 'grey--text text--darken-4',
                    width: '45%',
                    sortable: false
                },
                {
                    text:'Status',
                    class: 'grey--text text--darken-4',
                    width: '3%',
                    sortable: false
                },
                {
                    text:'',
                    class: 'grey--text text--darken-4',
                    width: '2%',
                    sortable: false
                },
            ],
        },
        items:[],
        ConfirmData : {},
    }
}

export default state;