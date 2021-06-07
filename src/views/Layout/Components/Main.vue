<template>
  <div id="main_wrap">
    <div class="main_content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main_wrap {
  height: 100vh;
  // margin: 75px 0 0 250px;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // background-color: #fff;
  // box-sizing: border-box;
}
.main_content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30;
  padding-right: 30px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  .main_content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-left: 30px;
  @include webkit(box-sizing, border-box);
  background-color: #fff;
}
</style>
