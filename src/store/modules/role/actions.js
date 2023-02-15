import http from "../../../services/http";

const actions = {
    // Role List
    fetchRoleList: async ({ state, commit, dispatch }, payload) => {
        commit("setPreloadRoleList", true);
        commit("setRoleList", []);
        try {
            let search = state.role_list.search ? state.role_list.search : ''
            let status = state.role_list.status === 999 ? '' : state.role_list.status
            let division_id = state.role_list.filter.division_id ? state.role_list.filter.division_id : ''
            const response = await http.get("/role", {
                params: {
                    per_page:100,
                    search:search,
                    status:status,
                    division_id:division_id,
                }
            });
            if (response.data.data) commit("setRoleList", response.data.data)
            commit("setPreloadRoleList", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadRoleList", false);
        }
    },

    // Role Create
    fetchRoleCreate: async ({ state, commit, dispatch }, payload) => {
        commit("setConfirmRoleCreate", {});
        commit("setRoleCreate", {
            name: '',
            division_id: '',
            note: '',
            permissions:[],
        });
    },

    // Role Detail
    fetchRoleDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setRoleDetail', []);
        try {
            const response = await http.get("/role/"+payload.id);
            if (response.data.data) commit('setRoleDetail', response.data.data);
        } catch (error) {
        }
    },

    // Role Update
    fetchRoleUpdate: async ({ state, commit, dispatch }, payload) => {
        commit("setConfirmRoleUpdate", {});
    },
}

export default actions;

