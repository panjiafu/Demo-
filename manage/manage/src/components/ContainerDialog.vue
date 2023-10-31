<template>
  <div>
    <el-dialog v-model="dialogVisible" width="50%" @close="closedialog">
      <el-form :model="form" label-width="120px">
        <el-form-item v-for="(key, item) in label" :key="item" :label="key">
          <el-input v-model="form['tableList_' + item]" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)">修改</el-button>
          <el-button @click="onSet">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { editdata } from "../api/api";
export default {
  setup() {
    let store = useStore();
    let label = reactive({
      name: "名字",
      age: "年龄",
      sex: "性别",
      brithday: "出生日期",
      address: "地址",
    });
    let form = computed(() => {
      return store.state.dialog.data;
    });
    //computed value is readonly 只读，不允许修改。重写computed的get和set
    // let dialogVisible = computed(()=>{
    //     return store.state.dialog.value;
    // });
    let dialogVisible = computed({
      get() {
        return store.state.dialog.value;
      },
      set(newValue) {
        store.commit("computesSet", newValue);
      },
    });
    //提交数据，关闭Dialog
    let onSubmit = async (form) => {
      await editdata("/user/editdata",{form}).then((res) => {
        ElMessage({ message: res.data.tip, type: "success" });
      });
      store.state.dialog.value = false;
    };
    //返回
    let onSet = () => {
      store.state.dialog.value = false;
    };
    //关闭dialog
    let closedialog = () => {
      store.state.dialog.value = false;
    };
    return {
      onSubmit,
      onSet,
      dialogVisible,
      closedialog,
      label,
      form,
    };
  },
};
</script>
<style scoped lang="scss">
</style>