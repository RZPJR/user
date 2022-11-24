import http from "../../../services/http";

const actions = {
    fetchUserList: async ({ state, commit, dispatch }, payload) => {
        commit("setPreloadUserList", true);
        commit("setUserList", []);
        try {
            let search = state.user_list.filter.search
            let status = state.user_list.filter.status === 999 ? '' : "|status:"+state.user_list.filter.status
            let area = !state.user_list.filter.area ? '' : "|area_id.e:"+state.user_list.filter.area.id
            let division = !state.user_list.filter.division ? '' : "|role_id.division_id.id.e:"+state.user_list.filter.division.id
            let role = !state.user_list.filter.role ? '' : "|role_id.e:"+state.user_list.filter.role.id
            let warehouse = !state.user_list.filter.warehouse ? '' : "|warehouse_id.e:"+state.user_list.filter.warehouse.id            
            const response = await http.get("/user", {
                params: {
                    per_page:10000,
                    conditions:'Or.name.icontains:'+search+status,
                    orderby:'-id',
                }
            });
            if (response.data.data) commit("setUserList", response.data.data)
            commit("setPreloadUserList", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadUserList", false);
        }
    },
    fetchUpdateUserDetail: async ({ commit, dispatch }, payload) => {
        commit("setPreloadUpdateUserForm", true);
        try {
            const response = await http.get("/user/"+payload.id);
            let res = response.data.data
            if (response.data.data) {
                let items = response.data.data
                let selected_sub_roles = []
                if (items.sub_roles.length > 0) {
                    selected_sub_roles = items.sub_roles.map((e)=>{return e.id})
                }
                commit("setUpdateUserForm", {                
                    idUser: items.id,
                    employee_code: items.employee_code,
                    name: items.name,
                    nickname: items.nickname,
                    main_role: items.main_role.id,
                    sub_roles: selected_sub_roles,
                    phone_number: items.phone_number,
                    email: items.email,
                    region_id: 1,
                    site_id: 1,
                })
                commit("setDivisionUpdateUser", res.main_role.division)
                commit("setMainRoleUpdateUser", res.main_role)
                commit("setRoleUpdateUser", res.sub_roles)
            }
            commit("setPreloadUpdateUserForm", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadUpdateUserForm", false);
        }
    },
};

export default actions;
