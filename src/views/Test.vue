<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2>我是test组件啊，小老弟</h2>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
