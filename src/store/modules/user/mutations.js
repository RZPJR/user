const mutations = {
    // Readlist User
    setUserList: function(state, payload) {
        state.user_list.data = payload;
        return state;
    },
    setPreloadUserList: function(state, payload) {
        state.user_list.isLoading = payload;
        return state;
    },
    setStatusFilterUserList: function(state, payload) {
        state.user_list.filter.status = payload;
        return state;
    },
    setRegionFilterUserList: function(state, payload) {
        state.user_list.filter.region = payload;
        return state;
    },
    setSiteFilterUserList: function(state, payload) {
        state.user_list.filter.warehouse = payload;
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
    // Readlist User

    // Create User
    setDivisionCreateUser: function(state, payload) {
        state.create_user.division = payload;
        if (payload) {
            state.create_user.division_id = payload.id
        }
        return state;
    },
    setMainRoleCreateUser: function(state, payload) {
        state.create_user.main_role = payload ? payload : null;
        state.create_user.form.main_role = payload ? payload.id : null
        return state;
    },
    setCreateUserForm: function(state, payload) {
        state.create_user.form = payload;
        return state;
    },
    // Create User

    // Update User
    setUpdateUserForm: function(state, payload) {
        state.update_user.form = payload;
        return state;
    },
    setPreloadUpdateUserForm: function(state, payload) {
        state.update_user.isLoading = payload;
        return state;
    },
    setDivisionUpdateUser: function(state, payload) {
        state.update_user.division = payload;
        state.update_user.division_id = payload ? payload.id : ''
        return state;
    },
    setRegionUpdateUser: function(state, payload) {
        state.update_user.region = payload;
        return state;
    },
    setSiteUpdateUser: function(state, payload) {
        state.update_user.site = payload;
        return state;
    },
    setTerritoryUpdateUser: function(state, payload) {
        state.update_user.territory = payload;
        return state;
    },
    setSupervisorUpdateUser: function(state, payload) {
        state.update_user.supervisor = payload;
        return state;
    },
    setMainRoleUpdateUser: function(state, payload) {
        state.update_user.main_role = payload;
        state.update_user.form.main_role = payload ? payload.id : ''
        return state;
    },    
    setFormRoleUpdateUser: function(state, payload) {
        state.update_user.form.sub_roles = payload;
        return state;
    },
    setRoleUpdateUser: function(state, payload) {
        state.update_user.role = payload;
        return state;
    },
    // Update User

    // Detail User    
    setPreloadUserDetail: function(state, payload) {
        state.user_detail.isLoading = payload;
        return state;
    },
    setUserDetail: function(state, payload) {
        state.user_detail.user = payload;
        return state;
    },
    // Detail User
};

export default mutations;
