<template>
  <div class="common-layout">
    <el-container class="c-first">
      <ContainerAside></ContainerAside>
      <el-container direction="vertical">
        <ContainerHeader></ContainerHeader>
        <ContainerTab></ContainerTab>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script >
import ContainerAside from "../components/ContainerAside.vue";
import ContainerHeader from "../components/ContainerHeader.vue";
import ContainerTab from "../components/ContainerTab.vue"
export default {
  components: {
    ContainerAside,
    ContainerHeader,
    ContainerTab
  },
  setup() {
  },
};
</script>
<style scoped lang="scss">
.el-container {
  flex-wrap: nowrap;
}
.common-layout {
  height: 100%;
  .c-first {
    flex-wrap: nowrap;
  }
  .el-container {
    height: 100%;
  }
}
</style>