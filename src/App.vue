<template>
  <div id="app">
    <router-view :system="system"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data(){
    return{
      msg:"欢迎你来到Vue.js的世界",
      system:{
      logo:require('./assets/logo.png'),
      title:'欢迎你来到Vue.js的世界',
      copyright:"版权所有@0910"
    }
    }
  }
}
</script>

<style>
  ul li{
    list-style: none;
  }
  *{
    margin:0;
    padding: 0;
  }
  a{
    text-decoration: none;
  }
</style>
