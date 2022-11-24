const mutations = {
    // Readlist User
    setUserList: function(state, payload) {
        state.user_list.data = payload;
        return state;
    },
    setPreloadUserList: function(state, payload) {
        state.user_list.is_loading = payload;
        return state;
    },
    setAreaFilterUserList: function(state, payload) {
        state.user_list.filter.area = payload;
        return state;
    },
    setDivisionFilterUserList: function(state, payload) {
        state.user_list.filter.division = payload;
        return state;
    },
    setRoleFilterUserList: function(state, payload) {
        state.user_list.filter.role = payload;
        return state;
    },
    setWarehouseFilterUserList: function(state, payload) {
        state.user_list.filter.warehouse = payload;
        return state;
    },

    // Create User
    setDivisionCreateUser: function(state, payload) {
        state.create_user.division = payload;
        if (payload) {
            state.create_user.division_id = payload.id
        }
        return state;
    },
    setMainRoleCreateUser: function(state, payload) {
        state.create_user.main_role = payload;
        state.create_user.form.main_role = payload ? payload.id : ''
        return state;
    },
    setRoleCreateUser: function(state, payload) {
        state.create_user.role = payload;
        state.create_user.form.sub_roles = payload
        return state;
    },

    // Update User
    setUpdateUserForm: function(state, payload) {
        state.updateUser.form = payload;
        return state;
    },
    setPreloadUpdateUserForm: function(state, payload) {
        state.updateUser.isLoading = payload;
        return state;
    },
    setDivisionUpdateUser: function(state, payload) {
        state.updateUser.division = payload;
        state.updateUser.form.division_id = payload ? payload.id : ''
        return state;
    },
    setRoleUpdateUser: function(state, payload) {
        state.updateUser.role = payload;
        state.updateUser.form.role_id = payload ? payload.id : ''
        return state;
    },
    setSalesGroupUpdateUser: function(state, payload) {
        state.UpdateUser.form.sales_group_id = payload
        return state;
    },
    setSupervisorUpdateUser: function(state, payload) {
        state.updateUser.supervisor = payload;
        state.updateUser.form.supervisor_id = payload ? payload.id : ''
        return state;
    },
    setAreaUpdateUser: function(state, payload) {
        state.updateUser.area = payload;
        state.updateUser.form.area_id = payload ? payload.id : ''
        return state;
    },
    setWarehouseUpdateUser: function(state, payload) {
        state.updateUser.warehouse = payload;
        state.updateUser.form.warehouse_id = payload ? payload.id : ''
        return state;
    },
};

export default mutations;
