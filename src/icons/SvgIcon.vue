<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "SvgIcon",
  //定义属性，父组件使用时需要按照属性要求进行传参
  //props:['iconClass', 'className'],//对属性类型没有要求
  props: {
    iconClass: {
      type: String, //值类型，值类型为引用类型时，默认值要以函数返回值的形式进行传递;如：type: Array,default: () => []
      default: "index", //默认值
      require: true, //是否必传项
      //validator: () => {}, //校验器
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg_icon ${props.className}`;
      } else {
        return `svg_icon`;
      }
    });
    return {
      iconName,
      svgClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.svg_icon {
    width: 1em;
    height: 1em;
}
</style>