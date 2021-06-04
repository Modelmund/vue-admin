import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";

Vue.component("svg-icon", SvgIcon);

//解析svg文件 目录，是否遍历子级文件夹,规则
const req = require.context('./svg', false, /\.svg$/);

const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);

// console.log(requireAll(req))