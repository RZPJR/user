const mutations = {
    // #region Readlist User
    setUserList: function(state, payload) {
        state.user_list.data = payload;
        return state;
    },
    setPreloadUserList: function(state, payload) {
        state.user_list.is_loading = payload;
        return state;
    },
    setRegionFilterUserList: function(state, payload) {
        state.user_list.filter.region = payload;
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
    // #endregion

    // #region Create User
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
    setRoleCreateUser: function(state, payload) {
        state.create_user.role = payload ? payload : null;
        state.create_user.form.sub_roles = payload ? payload.id : null
        return state;
    },
    setCreateUserForm: function(state, payload) {
        state.create_user.form = payload;
        return state;
    },
    // #endregion

    // #region Update User
    setUpdateUserForm: function(state, payload) {
        state.update_user.form = payload;
        return state;
    },
    setPreloadUpdateUserForm: function(state, payload) {
        state.update_user.is_loading = payload;
        return state;
    },
    setDivisionUpdateUser: function(state, payload) {
        state.update_user.division = payload;
        state.update_user.division_id = payload ? payload.id : ''
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
    // #endregion Update User

    // #region Detail User    
    setPreloadUserDetail: function(state, payload) {
        state.user_detail.is_loading = payload;
        return state;
    },
    setUserDetail: function(state, payload) {
        state.user_detail.user = payload;
        return state;
    },
    // #endregion Detail User
};

export default mutations;
