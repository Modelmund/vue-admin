import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
  },
  mutations: {
    SET_COLLAPSE(state){
      console.log(111)
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {},
  modules: {},
});
