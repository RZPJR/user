const mutations = {
    setDivisionList: function(state, payload) {
        state.division_list.items = payload;
        return state;
    },
    setPreloadDivisionList: function(state, payload) {
        state.division_list.loading = payload;
        return state;
    },
}

export default mutations;