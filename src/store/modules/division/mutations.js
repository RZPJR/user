const mutations = {
    setDivisionList: function(state, payload) {
        state.division_list.items = payload;
        return state;
    },
    setPreloadDivisionList: function(state, payload) {
        state.division_list.loading = payload;
        return state;
    },
    setCreateDivisionForm: function(state, payload) {
        state.create_division.form = payload;
        return state;
    },
    setUpdateDivisionForm: function(state, payload) {
        state.update_division.form = payload;
        return state;
    },
}

export default mutations;