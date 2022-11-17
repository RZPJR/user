const mutations = {
    // Readlist User
    setUserList: function(state, payload) {
        state.userList.data = payload;
        return state;
    },
    setPreloadUserList: function(state, payload) {
        state.userList.isLoading = payload;
        return state;
    },
    setAreaFilterUserList: function(state, payload) {
        state.userList.filter.area = payload;
        return state;
    },
    setDivisionFilterUserList: function(state, payload) {
        state.userList.filter.division = payload;
        return state;
    },
    setRoleFilterUserList: function(state, payload) {
        state.userList.filter.role = payload;
        return state;
    },
    setWarehouseFilterUserList: function(state, payload) {
        state.userList.filter.warehouse = payload;
        return state;
    },

    // Create User
    setDivisionCreateUser: function(state, payload) {
        state.createUser.division = payload;
        if (payload) {
            state.createUser.form.division_id = payload.id
        }
        return state;
    },
    setRoleCreateUser: function(state, payload) {
        state.createUser.role = payload;
        state.createUser.form.role_id = payload ? payload.id : ''
        return state;
    },
    setSalesGroupCreateUser: function(state, payload) {
        state.createUser.form.sales_group_id = payload
        return state;
    },
    setSupervisorCreateUser: function(state, payload) {
        state.createUser.supervisor = payload;
        state.createUser.form.supervisor_id = payload ? payload.id : ''
        return state;
    },
    setAreaCreateUser: function(state, payload) {
        state.createUser.area = payload;
        state.createUser.form.area_id = payload ? payload.id : ''
        return state;
    },
    setWarehouseCreateUser: function(state, payload) {
        state.createUser.warehouse = payload;
        state.createUser.form.warehouse_id = payload ? payload.id : ''
        return state;
    },
};

export default mutations;
