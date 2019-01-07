<template>
  <div class="register">
    <top :system="system"></top>
    <form class="form-block" @submit.prevent="registerSave">
        <ul>
           <li><label></label>
            <div class="avatar">
                    <input type="file" @change="a" class="upload_file" ref="upload_file" file="../assets/avatar.jpg">
                    <img :src="users.imageUrl"  alt="点击上传头像">
                    <input type="hidden"  v-model="users.imageUrl">
                </div> 
           </li>
           <li>
               <label>用户昵称</label><input type="text" v-model="users.name">
           </li>
           <li><label>初始密码</label><input type="password" v-model="users.pass">
           </li>
           <li><label>确认密码</label><input type="password" v-model="users.checkpass"></li>
           <li v-if="!verify.Boolean">
               <p>{{show}}</p>
           </li>
           <li><label></label>
              <button type="submit">注册用户</button>
           </li>
       </ul>
    </form>
    <foot :system="system"></foot>
  </div>
</template>

<script>
import top from './Top.vue'
import foot from './Foot.vue'
export default {
  name: 'register',
  props: {
    system: Object
  },
  data(){
     return {
     	show:"",
        users:{
            pic:'',
            name:'',
            pass:'',
            checkpass:'',
            send:1,
            imageUrl:require('../assets/avatar.jpg')
        },
        verify:{
            Boolean:false,
            message:[]
        }
     }
  },
  computed: {
          set_vefify(){
          return Array.from(new Set(this.verify.message))
      }
  },
  methods:{
      verify_username(){
            let username = this.users.name;
            let reg = /^[\u4e00-\u9fa5]+$/;
            if(!reg.test(username)){
                this.verify.message.push('用户名必须是中文')
                this.verify.Boolean = false
            }else{
                this.verify.Boolean = true
            }
            return this.verify.Boolean;
      },
      verify_passowrd(){
          if(this.users.pass!="" && this.users.checkpass!=""){
            let $password = this.users.pass;
            let $checkpass = this.users.checkpass;
            if ($password != $checkpass) {
                this.verify.message.push("初始密码和确认密码不符合");
                this.verify.Boolean = false;
                return this.verify.Boolean;
            }else{
               this.verify.Boolean = true;
               return this.verify.Boolean;
            }
          }else{
              this.verify.message.push("密码不能为空");
              this.verify.Boolean = false;
              return this.verify.Boolean;
          }
      },
    a(){
       let _this = this;
       let file = this.$refs.upload_file.files[0]
       console.log(file)
       let reader = new FileReader(); 
        reader.onload = function(){
            _this.users.imageUrl=reader.result
        }
        reader.readAsDataURL(file);    //Base64
    },
    registerSave(){
    	this.verify.message = [];
    	this.verify.Boolean = (this.verify_username() && this.verify_passowrd())
    	this.show = this.verify.message.join(",")
    	// console.log(this.verify_username())
    	// console.log(this.verify_passowrd())
    	// console.log(this.verify.Boolean)
    	// console.log(this.show)
    	if (this.verify.Boolean) {
        let formData={
            send:this.users.send,
            username:this.users.name,
            password:this.users.pass,
            checkpass:this.users.checkpass,
            userAvatar:this.users.imageUrl
        }
        formData = this.qs.stringify(formData);
        // console.log(formData)
        // console.log(this.users.imageUrl)
        this.axios.post('api/registerSave.php',formData)
        .then((res)=>{
            // console.log(res.data)
            alert(res.data.message)
            if (res.data.valid) {
              this.$router.push({path:'/Login'})
              // console.log(1111111)
            }
        })
    }
}
  },
  components: {
    top,
    foot
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

   .form-block{
       width:600px;
       margin:25px auto;
       position: relative;
   }
    .form-block li{
        margin-bottom: 25px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .form-block li p{
        padding-left:120px;
        margin-top: 15px;
    }
    .form-block li label{
       width:120px;
       padding:0 15px;
       line-height: 35px;
       text-align: right;
    }
    .form-block li input{
        border-radius: 5px;
        height:35px;
        line-height: 35px;
        padding:0 15px;
        border:1px solid darkgray;
        width:calc(100% - 120px)
    }
     .form-block li input:focus{
         outline: none
     }
  .avatar{
      position:relative;;
      width:120px;
      height:120px;
      border:1px solid #333;
      overflow: hidden;
      margin:10px 0;
  }
  .avatar img{
      position: absolute;
      left:0;
      right:0;
      width:100%;
      min-height: 120px;
  }
  .form-block li input.upload_file{
      position: absolute;
      z-index: 999;
      opacity:0;
      width:100%;
      height:100%;
   }
   button{
    padding: 5px;
    color: #333;
   }
</style>
