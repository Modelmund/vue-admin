<template>
  <div id="nav_wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routes">
        <el-submenu :key="item.id" v-if="!item.hidden" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :index="subItem.path"
            :key="subItem.id"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    const isCollapse = ref(false);
    const routes = root.$router.options.routes;
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      routes,
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped>
#nav_wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
}
svg{
  font-size: 20px;
  margin-right: 10px;
}
</style>>