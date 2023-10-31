<template>
  <editor></editor>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons";
import 'tinymce/models/dom'
import { onMounted, ref } from "vue";
export default {
  components: {
    Editor,
  },
  setup() {
    onMounted(() => {
      tinymce.init({});
    });
    return {};
  },
};
</script>
<style lang="scss" scoped="scoped">
</style>