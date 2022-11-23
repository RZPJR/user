const state = {
    // Readlist User
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
    },

    // Create User
    createUser: {
        form: {
            name: '',
            nickname: '',
            email: '',
            password:'',
            password_confirm:'',
            region_id: null,
            parent_id: null,
            site_id: null,
            territory_id: null,
            employee_code: '',
            phone_number: '',
            roles: [],
        },
        division: null,
        role: [],
        region_id: null,
        parent_id: null,
        site_id: null,
        territory_id: null,
        emailRules: [
            v => !!v || 'Please Enter email',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password at least 8 characters',
        ],
        confirmPasswordRules: [
            (value) => !!value || 'Confirm password is required',
            (value) => value === state.createUser.form.password || 'The password confirmation does not match.',
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
