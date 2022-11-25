const state = {
    // Readlist User
    user_list: {
        data: [],
        is_loading: [],
        filter:{
            area: null,
            division: null,
            role: null,
            search: '',
            status: 1,
            warehouse: null,
        },
        table_headers: [
            {
                text:'Code',
                class: 'grey--text text--darken-4',
                width: '10%',
                sortable: false,
            },
            {
                class: 'grey--text text--darken-4',
                text:'Display Name',
                width: '30%',
                sortable: false,
            },
            {
                text:'Role',
                class: 'grey--text text--darken-4',
                width: '40%',
                sortable: false,
            },
            {
                text:'Area',
                class: 'grey--text text--darken-4',
                width: '20%',
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
    },

    // Create User
    create_user: {
        form: {
            employee_code: '',
            name: '',
            nickname: '',
            region_id: 1, // area - sementara
            site_id: 1, // warehouse - sementara
            main_role: null,
            sub_roles: [],
            phone_number: '',
            email: '',
            password:'',
            password_confirm:'',
            parent_id: null, // supervisor
            territory_id: null, // salesperson id
        },
        division_id: null,
        division: null,
        main_role: [],
        role: [],
        // region_id: null,
        // parent_id: null,
        // site_id: null,
        // territory_id: null,
        email_rules: [
            v => !!v || 'Please Enter email',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password_rules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password at least 8 characters',
        ],
        confirm_password_rules: [
            (value) => !!value || 'Confirm password is required',
            (value) => value === state.create_user.form.password || 'The password confirmation does not match.',
        ],
    },

    // Update User
    updateUser: {
        isLoading: false,
        form: {
            idUser:'',
            name: '',
            email:'',
            display_name: '',
            employee_code: '',
            division_id: '',
            supervisor_id: '',
            role_id: '',
            sales_group_id: '',
            area_id: '',
            warehouse_id: '',
            phone_number: '',
            note: '',
        },
        division: null,
        role: null,
        supervisor: null,
        area: null,
        warehouse: null,
    }
};

export default state;
