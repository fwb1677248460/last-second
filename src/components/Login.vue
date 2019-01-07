<template>
  <div class="register">
      <div class="main">
          <h1>0910聊天室登陆</h1>
        <form>
      <div class="form-group">
        <label for="email">用户名</label>
        <input v-model="username">
      </div>
      <div class="form-group">
        <label for="pwd">密码</label>
        <input v-model="password" type="password">
      </div>
      <!-- <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" value="7" name="sevenDay" type="checkbox"> 保留陆登信息
        </label>
      </div> -->
        <button @click="login($event)">登陆</button>    
        <div id="error">{{error}}</div>
    </form>
      </div>
    <foot :system="system"></foot>
  </div>
</template>

<script>
import foot from './Foot.vue'
export default {
  name: 'login',
  props: {
    system: Object
  },
  data(){
     return {
       msg:"欢迎您来到Vue.js的世界",
       username:"",
       password:"",
       error:"",
     }
  },
  components: {
    foot
  },
  methods:{
    login(){
      event.preventDefault();
this.axios({
 method:"post",
 url:"http://fwb1314520.gz01.bdysite.com/api/loginSave.php",
 data:this.qs.stringify({
  send:1,
  username:this.username,
  password:this.password
 })
}).then((res)=>{
  if (res.data.valid == true){
  this.$router.push({path:'/'})
  }
  if (res.data.valid == false){
  this.error = res.data.message
  }
})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    width: 600px;
    margin:50px auto;
  }
  .main h1{
    font-size: 40px;
    color: #333;
    font-weight: 500;
  }
  label{
    display: block;
  }
  form{
    color:#666;
    font-size: 20px;
  }
  input{
    width: 200px;
    height: 20px;
  }
  .form-check-input{
    width: 20px;
    height: 18px;
    margin-top: 15px;
  }
  button{
    padding: 5px;
    border:1px solid #aaa;
    border-radius:4px 4px;
    margin-top: 10px;
  }
  #error{
    color:red;
    font-size: 20px;
    padding: 7px 0;
    height: 26px;
  }
  footer{
    position: absolute;
    bottom: 0;
  }
</style>
