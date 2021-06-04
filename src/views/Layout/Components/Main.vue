<template>
  <div id="main_wrap">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main_wrap {
    height: 100vh;
    margin: 75px 0 0 250px;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    background-color: #fff;
    // box-sizing: border-box;
}
</style>
