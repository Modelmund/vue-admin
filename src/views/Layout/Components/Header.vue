<template>
    <div id="header_wrap">
        <div class="pull-left header_icon">
            <svg-icon iconClass="menu"></svg-icon>
        </div>
        <div class="pull-right">
            <div class="pull-left user_info">管理员</div>
            <div class="pull-left header_icon">
                <svg-icon iconClass="close"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#header_wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    height: 75px;
    line-height: 75px;
    background-color: #fff;
    // width: calc(100wh -250px);
    box-shadow: 0 3px 16px 0 rgba(0,0,0,0.1);
    -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,0.1);
}
.header_icon {
    padding: 0 32px;
    svg{
        font-size: 25px;
        margin-bottom: -8px;
        cursor: pointer;
    }
}
.user_info {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
}
</style>>