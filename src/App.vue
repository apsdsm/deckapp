<template>
  <!-- <div id="nav">
    <router-link to='/'>Main Screen</router-link>
    <router-link to='/deck'>Deck</router-link>
  </div> -->

  <router-view></router-view>


</template>

<script>
// import fs from 'fs'
// import path from 'path'

// // import pathModule from 'path'

// import { app } from '@electron/remote'
// import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {

    const router = useRouter()

    onMounted(() => {
        router.push('/')
    })

    return {
      
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

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
}
</style>
