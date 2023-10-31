<template>
  <el-form :model="loginForm" class="loginForm" label-width="120px">
    <h3>系统登录</h3>
    <el-form-item label="用户名:">
      <el-input v-model="loginForm.username" />
    </el-form-item>
    <el-form-item label="密码:">
      <el-input v-model="loginForm.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getMenuData">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive } from "vue";
import { getMenu } from "../api/api";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    let loginForm = reactive({
      username: "admin",
      password: "admin",
    });
    let store = useStore();
    let Router = useRouter();
    let getMenuData = async () => {
      await getMenu("/user/login", {loginForm} ).then((res) => {
        console.log(res);
        if (res.data.code == 1) {
          ElMessage({ type: "success", message: res.data.tip });
          store.commit("setmenu", res.data);
          store.commit('setToken',res.data.token)
          Router.replace({
            path: "/Home",
          });
        } else if (res.data.code == 2) {
          ElMessage({ type: "error", message: res.data.tip });
        }
      });
    };
    return {
      loginForm,
      getMenuData,
    };
  },
};
</script>
<style lang="scss" scoped>
.loginForm {
  width: 350px;
  background-color: #fff;
  margin: 180px auto;
  border: solid 1px #eaeaea;
  box-shadow: 0 0 25px #cacaca;
  padding: 35px 35px 15px 35px;
  border-radius: 15px;
  h3 {
    text-align: center;
    margin-bottom: 15px;
  }
  .el-form-default {
    text-align: center;
  }
}
</style>