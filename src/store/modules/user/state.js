const state = {
    userList: {
        data: [],
        isLoading: [],
        filter:{
            area: null,
            division: null,
            role: null,
            search: '',
            status: 1,
            warehouse: null,
        },
        tableHeaders: [
            {
                text:'Code',
                class: 'grey--text text--darken-4',
                width: '12%',
                sortable: false,
            },
            {
                class: 'grey--text text--darken-4',
                text:'Display Name',
                sortable: false,
            },
            {
                text:'Role',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Area',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Status',
                width: '5%',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                width: '3%',
                class: 'grey--text text--darken-4',
                sortable: false
            },
        ],
    }
};

export default state;
