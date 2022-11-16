const mutations = {
    // User List
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
    setSearchFilterUserList: function(state, payload) {
        state.userList.filter.search = payload;
        return state;
    },
    setStatusFilterUserList: function(state, payload) {
        state.userList.filter.status = payload;
        return state;
    },
    setWarehouseFilterUserList: function(state, payload) {
        state.userList.filter.warehouse = payload;
        return state;
    },
};

export default mutations;
