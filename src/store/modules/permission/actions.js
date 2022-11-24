import http from "../../../services/http";

const actions = {
    fetchPermissionList: async ({ state, commit, dispatch }, payload) => {
        commit("setPreloadPermissionList", true)
        commit("setPermmissionList", [])
        try {
            let search = state.permissionList.search
            let status = state.permissionList.status === 999 ? '' : "|status:"+state.permissionList.status 
            const response = await http.get("/permission", {params: {
                per_page:100,
                conditions:'Or.name.icontains:'+search+status,
            }});
            commit("setPermmissionList", response.data.data)
            if(response.data.data === null){
                commit("setPermmissionList", [])
            }
            commit("setPreloadPermissionList", false)
           
        } catch (error) {
            console.log(error)
            commit("setPreloadPermissionList", false)
        }
        
    },
}

export default actions;

