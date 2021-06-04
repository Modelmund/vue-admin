import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import VueCompositionApi from "@vue/composition-api"
import "element-ui/lib/theme-chalk/index.css";
//引入svg-icon
import './icons/index'
Vue.use(VueCompositionApi);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
