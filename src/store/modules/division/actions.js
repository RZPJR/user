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
    fetchUserCreate: async ({ state, commit, dispatch }, payload) => {
        commit("setCreateDivisionForm", {
            code: '',
            name: '',
            note: '',
        })
    },
    fetchUserUpdate: async ({ commit }, payload) => {
        try {
            const response = await http.get("/division/"+payload.id);
            if (response.data.data) {
                let items = response.data.data
                commit("setUpdateDivisionForm", {
                    code: items.code,
                    name: items.name,
                    note: items.note,
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
}

export default actions;

