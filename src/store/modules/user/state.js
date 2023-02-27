const state = {
    // Readlist User
    user_list: {
        data: [],
        isLoading: [],
        filter:{
            region: null,
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
                width: '15%',
                sortable: false,
            },
            {
                class: 'grey--text text--darken-4',
                text:'Display Name',
                width: '25%',
                sortable: false,
            },
            {
                text:'Role',
                class: 'grey--text text--darken-4',
                width: '40%',
                sortable: false,
            },
            {
                text:'Region',
                class: 'grey--text text--darken-4',
                width: '15%',
                sortable: false,
            },
            {
                text:'Status',
                width: '3%',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                width: '2%',
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
            region_id: '',
            site_id: '',
            main_role: null,
            sub_roles: [],
            phone_number: '',
            email: '',
            password:'',
            password_confirm:'',
            parent_id: null, // supervisor
            territory_id: null, // salesperson id
        },
        supervisor: null,
        division_id: null,
        division: null,
        region: null,
        site: null,
        main_role: [],
        role: [],
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
    update_user: {
        isLoading: false,
        form: {
            idUser:'',
            employee_code: '',
            name: '',
            nickname: '',
            main_role: '',
            region_id: '',
            site_id: '',
            parent_id: '',
            territory_id: '',
            sub_roles: [],
            phone_number: '',
            email:'',
            note:'',
        },
        division_id: null,
        division: null,
        main_role: [],
        role: [],
        supervisor: null,
        region: null,
        site: null,
        territory: null,
    },

    // Detail User
    user_detail: {
        isLoading: false,
        user: {
            id: 0,
            employee_code: '-',
            name: '-',
            nickname: '-',
            division: '-',
            main_role: '-',
            sub_roles: [],
            phone_number: '-',
            email: '-',
            status: 0,
            status_convert: '-',
        }
    },

    password:{
        password:'',
        confirm_password:''
    },
};

export default state;
