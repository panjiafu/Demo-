<template>
  <router-view />
</template>
<script>
import { useStore } from 'vuex'

export default {
  setup() {
    let store = useStore()
    store.commit('addmenu')
  },
}
</script>
<style>
#app {
  height: 100%;
}
</style>
