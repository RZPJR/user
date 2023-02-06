import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import permission from "./modules/permission"
import role from "./modules/role"
import division from "./modules/division"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    permission,
    role,
    division,
  }
});
