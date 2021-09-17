<template>
  <div id="nav">
    <router-link to='/'>Main Screen</router-link>
    <router-link to='/deck'>Deck</router-link>
  </div>

  <router-view></router-view>

  {{ files }}
</template>

<script>
import fs from 'fs'
// import pathModule from 'path'

import { app } from '@electron/remote'
import { computed, ref } from 'vue'
// import { onMounted } from 'vue'
// import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {

    const path = ref(app.getAppPath());
    
    const files = computed(() => {
      const fileNames = fs.readdirSync(path.value);
      return fileNames;
    });

    return {
      files
    }
  }
}
</script>

<style>

body {
  background: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
