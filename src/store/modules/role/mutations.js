const mutations = {
    // Role List
    setRoleList: function(state, payload) {
        state.role_list.items = payload;
        return state;
    },
    setPreloadRoleList: function(state, payload) {
        state.role_list.loading = payload;
        return state;
    },

    // Role Create
    setRoleCreate: function(state, payload) {
        state.role_create.form = payload;
        return state;
    },
    setConfirmRoleCreate: function(state, payload) {
        state.role_create.ConfirmData = payload;
        return state;
    },

    // Role Detail
    setRoleDetail: function(state, payload) {
        state.role_detail.item = payload;
        return state;
    },

    // Role Update
    setConfirmRoleUpdate: function(state, payload) {
        state.role_update.ConfirmData = payload;
        return state;
    },
}

export default mutations;