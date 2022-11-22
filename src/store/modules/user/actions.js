import http from "../../../services/http";

const actions = {
    fetchUserList: async ({ state, commit, dispatch }, payload) => {
        commit("setPreloadUserList", true);
        commit("setUserList", []);
        try {
            let search = state.userList.filter.search
            let status = state.userList.filter.status === 999 ? '' : "|status:"+state.userList.filter.status
            let area = !state.userList.filter.area ? '' : "|area_id.e:"+state.userList.filter.area.id
            let division = !state.userList.filter.division ? '' : "|role_id.division_id.id.e:"+state.userList.filter.division.id
            let role = !state.userList.filter.role ? '' : "|role_id.e:"+state.userList.filter.role.id
            let warehouse = !state.userList.filter.warehouse ? '' : "|warehouse_id.e:"+state.userList.filter.warehouse.id            
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
            const response = await http.get("/user/staff/"+payload.id);
            let res = response.data.data
            if (response.data.data) {
                commit("setUpdateUserForm", {                
                    idUser: res.user.id,
                    name: res.name,
                    email: res.user.email,
                    display_name: res.display_name,
                    employee_code: res.employee_code,
                    division_id: res.role.division.id,
                    supervisor_id: '',
                    role_id: res.role.id,
                    sales_group_id: res.sales_group_id == 0 ? '' : res.sales_group_id,
                    area_id: res.area.id,
                    warehouse_id: res.warehouse.id,
                    phone_number: res.phone_number,
                    note: res.user.note,
                })
                commit("setDivisionUpdateUser", res.role.division)
                commit("setRoleUpdateUser", res.role)
                commit("setAreaUpdateUser", res.area)
                commit("setWarehouseUpdateUser", res.warehouse)
            }
            commit("setPreloadUpdateUserForm", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadUpdateUserForm", false);
        }
    },
};

export default actions;
