import Vue from "vue";
import Vuex from "vuex";

import pagination from "./modules/pagination";
import user from "./modules/user";
import permission from "./modules/permission"
import role from "./modules/role"
import division from "./modules/division"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pagination,
    user,
    permission,
    role,
    division,
  }
});
