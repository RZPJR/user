const state = {
    role_list: {
        search: '',
        loading: false,
        area:null,
        division:null,
        role:null,
        filter2 : false,
        warehouse:null,
        filter:{
            area_id:'',
            division_id:'',
            role_id:'',
            warehouse_id:'',
        },
        disabled_warehouse:true,
        clearWarehouse:false,
        disabled_role:true,
        clearRole:false,
        status:1,
        showFilter: false,
        table: {
            fields: [
                {
                    text:'Code',
                    class: 'grey--text text--darken-4',
                    width: "30%",
                    sortable: false,
                },
                {
                    text:'Division',
                    class: 'grey--text text--darken-4',
                    width: "30%",
                    sortable: false,
                },
                {
                    text:'Note',
                    class: 'grey--text text--darken-4',
                    width: "35%",
                    sortable: false,
                },
                {
                    text:'Status',
                    width: "3%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text:'',
                    width: "2%",
                    sortable: false
                },
            ],
        },
        items:[],
        ConfirmData : {},
    }
}

export default state;