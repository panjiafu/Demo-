<template>
  <el-header>
    <div class="L-header">
      <el-button size="small" style="margin-right: 10px" @click="handeCollapse">
        <el-icon>
          <Menu></Menu>
        </el-icon>
      </el-button>
      <el-breadcrumb class="bread" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current"
          >{{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="demo-image">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="userheader" src="../assets/images/headerimg.png" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="Exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
  setup() {
    let store = useStore();
    let Router = useRouter()
    const handeCollapse = () => {
      store.commit("updateisCollaspe");
    };
	//导航
    let current = computed(() => {
      return store.state.currentMenu;
    });
    //退出
    let Exit = () =>{
        store.commit('clearmenu')
        store.commit('cleartoken')
        Router.push({
          name:'login'
        })
    }
    return {
      handeCollapse,
      current,
      Exit
    };
  },
};
</script>
<style scoped lang="scss">
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
  color: white;
  .L-header {
    display: flex;
    .bread {
      line-height: 24px;
    }
    .bread ::v-deep span {
      color: #fff !important;
      cursor: pointer !important;
    }
  }
  .demo-image {
    .userheader {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>