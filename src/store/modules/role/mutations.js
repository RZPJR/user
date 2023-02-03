const mutations = {
    setRoleList: function(state, payload) {
        state.role_list.items = payload;
        return state;
    },
    setPreloadRoleList: function(state, payload) {
        state.role_list.loading = payload;
        return state;
    },
}

export default mutations;