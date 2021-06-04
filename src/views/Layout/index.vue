<template>
  <div id="layout_wrap">
    <LayoutHeader />
    <LayoutNav />
    <LayoutMain />
  </div>
</template>

<script>
import LayoutHeader from "./Components/Header.vue";
import LayoutNav from "./Components/Nav.vue";
import LayoutMain from "./Components/Main.vue";
export default {
  name: "Index",
  components: {LayoutHeader, LayoutNav, LayoutMain},
};
</script>

<style lang="scss" scoped></style>
>
