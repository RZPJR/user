import http from "../../../services/http";

const actions = {
    fetchRoleList: async ({ state, commit, dispatch }, payload) => {
        commit("setPreloadRoleList", true);
        commit("setRoleList", []);
        try {
            let search = state.role_list.search ? state.role_list.search : ''
            let status = state.role_list.status === 999 ? '' : state.role_list.status
            const response = await http.get("/role", {
                params: {
                    per_page:100,
                    order_by:'-id',
                    search:search,
                    status:status,
                }
            });
            if (response.data.data) commit("setRoleList", response.data.data)
            commit("setPreloadRoleList", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadRoleList", false);
        }
    },
}

export default actions;

