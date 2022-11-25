const mutations = {
    setPermmissionList: function(state, payload) {
        state.permissionList.data = payload;
        return state;
    },
    setPreloadPermissionList: function(state, payload) {
        state.permissionList.isLoading = payload;
        return state;
    },
    setStatusFilterUserList: function(state, payload){
        state.permissionList.status = payload;
        return state;
    }
}

export default mutations;