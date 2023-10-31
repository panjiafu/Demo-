<template>
  <div class="tags">
    <el-tag
      v-for="(item,index) in Tags"
      :key="item.name"
      :closable="item.name != 'Home'"
      :disable-transitions="false"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeTag(item)"
      @close="handleClose(item,index)"
      >{{ item.label }}</el-tag
    >
  </div>
</template>
<script>
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    let router = useRouter();
    let route = useRoute();
    let store = useStore();
    let Tags = useStore().state.tagsList;
    let changeTag = (item) => {
      router.push({ name: item.name });
    };
    let handleClose =(item,index)=>{
        let lenght = Tags.length - 1
        //处理vuex中的tagList
        store.commit('closeTag',item)
        //判断
        if(item.name !=route.name ){
            return
        }
        if(index === lenght){
            router.push({
                name:Tags[index -1].name
            })
        }else{
            router.push({
                name:Tags[index].name

            })
        }
    }
    return {
      Tags,
      changeTag,
      handleClose
    };
  },
};
</script>
<style lang="scss" scoped>
.tags {
  margin-top: 20px;
  width: 100%;
  .el-tag {
    margin: 0px 0px 20px 20px;
  }
}
</style>
