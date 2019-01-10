<template>
  <header class="top">
    <div class="wrap">
      <div class="logo"><img v-bind:src="system.logo" :alt="system.title" :title="system.title"><h1>{{system.title}}</h1>
      </div>
      <div class="nav">
        <ul>
          <li>
                   <router-link to="/">首页</router-link>
               </li>
               <li>
                   <router-link to="/NewPost">发布聊天室</router-link>
               </li>              
               <li>
                   <router-link to="/Register">用户注册</router-link>
               </li> 
               <li v-if="msg_boolen">
                   <router-link to="/Login">会员登陆</router-link>
               </li>
               <template v-else>
               <li>{{msg}}</li>
               <li @click="quit">quit</li>
               </template>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'top',
  data(){
    return{
        msg_boolen:"true",
        msg:""
    }
  },
  props: {
    system:Object
  },
  methods:{
    quit(){
      if (confirm("你确定退出么?")) {
      $cookies.remove("username")
      $cookies.remove("userId")
      $cookies.remove("userlevel")
      }
      if(!$cookies.get("username")){
      alert("您未登陆")
      this.$router.push({path:'/Login'})
    }
    }
  },
  created(){
    this.msg = $cookies.get("username")
    if (this.msg!= null) {
      this.msg_boolen = false
    }else{
      this.msg_boolen = true
    }
    // console.log(this.msg_boolen)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top{
    box-sizing: border-box;
    background: #333;
    height: 50px;
    width: 100%;
    color: #eee;
    padding: 0 10%;
  }
  .top>.wrap{
    display: flex;
    justify-content: space-between;
  }
  .logo{
    width: 25%;
    position:relative; 
  }
  .logo h1{
    position: absolute;
    left: 60px;
    top:0;
    line-height: 50px;
    font-size: 18px;
  }
  .logo img{
    width: 10%;
    position: absolute;
    left: 0;
    top: 10px;
  }
  .nav{
    width: 75%;
  }
  .nav ul{
    display: flex;
    justify-content:flex-end;
  }
  .nav ul li{
    line-height: 50px;
    font-size: 15px;
    margin-left: 15px;
  }
  .nav ul li a{
    color: #fff;
    display: inline-block;
    padding: 0 15px;
    text-align: center;
  }
  .nav ul li .router-link-exact-active{
    background: red;
  }
</style>
