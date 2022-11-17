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
            display_name: '',
            employee_code: '',
            password:'',
            confirm_password:'',
            division_id: '',
            supervisor_id: '',
            role_id: '',
            sales_group_id: '',
            area_id: '',
            warehouse_id: '',
            phone_number: '',
            email: '',
            note: '',
            permission_id: ['65536'],
        },
        division: null,
        role: null,
        supervisor: null,
        area: null,
        warehouse: null,
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
    }
};

export default state;
