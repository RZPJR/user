import http from "../../../services/http";

const actions = {
    fetchDivisionList: async ({ state, commit, dispatch }, payload) => {
        commit("setPreloadDivisionList", true)
        commit("setDivisionList", [])
        try {
            let search = state.division_list.search
            let status = state.division_list.statuses === 999 ? '' : state.division_list.statuses 
            const response = await http.get("/division", {params: {
                per_page:100,
                status:status,
                search:search
            }});
            commit("setDivisionList", response.data.data)
            if(response.data.data === null){
                commit("setDivisionList", [])
            }
            commit("setPreloadDivisionList", false)
           
        } catch (error) {
            console.log(error)
            commit("setPreloadDivisionList", false)
        }
        
    },
}

export default actions;

