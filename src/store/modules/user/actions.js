import http from "../../../services/http";

const actions = {
    fetchUserList: async ({ state, commit, dispatch }, payload) => {
        commit("setPreloadUserList", true);
        commit("setUserList", []);
        try {
            let search = state.user_list.filter.search ? state.user_list.filter.search : ''
            let status = state.user_list.filter.status === 999 ? '' : state.user_list.filter.status
            let division = !state.user_list.filter.division ? '' : state.user_list.filter.division.id
            let role = !state.user_list.filter.role ? '' : state.user_list.filter.role.id
            let warehouse = state.user_list.filter.warehouse
            let region = state.user_list.filter.region
            const response = await http.get("/user", {
                params: {
                    per_page:100,
                    orderby:'-id',
                    search:search,
                    status:status,
                    division_id: division,
                    role_id: role
                }
            });
            commit("setCreateUserForm", {
                employee_code: '',
                name: '',
                nickname: '',
                region_id: '', 
                site_id: '', 
                main_role: null,
                sub_roles: [],
                phone_number: '',
                email: '',
                password:'',
                password_confirm:'',
                parent_id: null, 
                territory_id: null, 
            })
            if (response.data.data) commit("setUserList", response.data.data)
            commit("setPreloadUserList", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadUserList", false);
        }
    },
    fetchUserCreate: async ({ state, commit, dispatch }, payload) => {
        commit("setCreateUserForm", {
            employee_code: '',
            name: '',
            nickname: '',
            region_id: '', 
            site_id: '', 
            main_role: null,
            sub_roles: [],
            phone_number: '',
            email: '',
            password:'',
            password_confirm:'',
            parent_id: null, 
            territory_id: null, 
        })
    },
    fetchUpdateUserDetail: async ({ commit, dispatch }, payload) => {
        commit("setPreloadUpdateUserForm", true);
        try {
            const response = await http.get("/user/"+payload.id);
            let res = response.data.data
            if (response.data.data) {
                let items = response.data.data
                let selected_sub_roles = []
                if (items.sub_roles !== undefined && items.sub_roles.length > 0) {
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
                    region_id: '',
                    adm_division_id: '',
                    parent_id: items.parent_id,
                    site_id: items.site.id,
                    site_id_gp: '',
                    territory_id: items.territory.id,
                    territory_id_gp: '',
                    note: items.note,
                })
                commit("setDivisionUpdateUser", res.main_role.division)
                commit("setRegionUpdateUser", res.region)
                commit("setSiteUpdateUser", res.site)
                commit("setMainRoleUpdateUser", res.main_role)
                commit("setTerritoryUpdateUser", res.territory)
                commit("setSupervisorUpdateUser", {id:res.parent_id})
                commit("setRoleUpdateUser", res.sub_roles)
            }
            commit("setPreloadUpdateUserForm", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadUpdateUserForm", false);
        }
    },
    fetchUserDetail: async ({ commit, dispatch }, payload) => {
        commit("setPreloadUserDetail", true);   
        try {
            const response = await http.get("/user/"+payload.id);
            let res = response.data.data
            if (response.data.data) {
                let items = response.data.data
                commit("setUserDetail", {
                    id: items.id,
                    employee_code: items.employee_code,
                    name: items.name,
                    nickname: items.nickname,
                    division: items.main_role.division.name,
                    main_role: items.main_role.name,
                    role_id: items.main_role.id,
                    sub_roles: items.sub_roles,
                    phone_number: items.phone_number,
                    email: items.email,
                    status: items.status,
                    region: items.adm_division.region,
                    site: items.site.code+' - '+items.site.description,
                    territory: items.territory.code+' - '+items.territory.description,
                    note: items.note
                })
            }
            commit("setPreloadUserDetail", false);   
        } catch (error) {
            console.log(error)
            commit("setPreloadUserDetail", false);   
        }
    },
};

export default actions;
