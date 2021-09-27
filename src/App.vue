<template>
  <div id="nav">
    <router-link to="/">Practice</router-link>
    <router-link to="/deck">Deck</router-link>
  </div>

  <router-view></router-view>
</template>

<script>
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

#nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: rgb(255, 255, 232);
    border-bottom: 1px solid rgb(240, 240, 219);
}

#nav a {
    display: block;
    width: 50%;
    padding: 10px 5px;
    text-decoration: none;
    color:chocolate;
}

#nav a:hover {
  color:crimson;
  background-color: rgb(255, 254, 172);
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
}

button {
    background-color: rgb(184, 195, 201);
    border: 0;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
    margin: 0 5px;
}

button:hover {
    background-color: rgb(161, 202, 224);
    cursor: pointer;
}
</style>
