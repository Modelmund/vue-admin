<template>
  <div id="layout_wrap" :class="[homeState ? 'open' : 'close']">
    <LayoutHeader />
    <LayoutNav />
    <LayoutMain />
  </div>
</template>

<script>
import LayoutHeader from "./Components/Header.vue";
import LayoutNav from "./Components/Nav.vue";
import LayoutMain from "./Components/Main.vue";
import { computed } from "@vue/composition-api";
export default {
  name: "Index",
  components: { LayoutHeader, LayoutNav, LayoutMain },
  setup(props, { root }) {
    const homeState = computed(() => root.$store.state.isCollapse);
    return {
      homeState,
    };
  },
};
</script>

<style lang="scss" scoped></style>
>
