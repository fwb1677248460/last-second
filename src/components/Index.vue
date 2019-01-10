<template>
  <div class="index">
    <top :system="system"></top>
    <section>
      <ul class="main">
        <li v-for="(val,index) in news" :key="index">
          <router-link :to={path:/newView/+val.chatId} class="clear">
            <div class="data fl">
              <div>
              {{val.createDate.split('-')[0]}}

              {{val.createDate.split('-')[1]}}-{{val.createDate.split('-')[2]}}
              </div>
            </div>
            <div class="fl body">
              <div class="title">
                {{val.title}}
              </div>
              <div class="content">
                {{val.body}}
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <foot :system="system">
      
    </foot>
  </div>
</template>

<script>

import top from './Top.vue'
import foot from './Foot.vue'
export default {
  name:'Index',
  props:{
    system:Object
  },
  data(){
    return{
    news:[]
  }
},
  methods:{
    getNewsList(){
      this.axios.get('http://fwb1314520.gz01.bdysite.com/api/getChatList.php').then((res)=>{
        this.news = res.data;
        // console.log(this.news)
      })
    }
  },
  created(){
    // console.log($cookies.get("username"));
    this.getNewsList();
  },
  beforeCreate(){
    if(!$cookies.get("username")){
      alert("您未登陆")
      this.$router.push({path:'/Login'})
    }
  },
    components:{
      top,foot
    }
}
</script>

<style scoped>
  header{
    background: #000;
  } 
  .main li {
    width: 80%;
    margin: 0 auto;
  }
  .data>div{
    text-align: center;
    color: #fff;
  }
  .data{
    padding: 9px 0;
    background: rgb(55,171,0);
    width: 60px;
    border-radius: 4px 4px;
  }
  .body{
    width: 800px;
    margin-left: 30px;
    border: 1px solid #eee;
    border-radius: 4px 4px;
    box-shadow: 5px 0 10px #eee;
  }
  .body .title{
    border-bottom:1px solid #eee;
    line-height: 40px;
    height: 40px;
    color:rgb(55,171,0);
    font-size: 18px;
    font-weight: 550;
    text-indent: 20px;
  }
  .body .content{
    padding: 20px 20px;
    line-height: 30px;
    color:#666;
  }
  .fl{
    float: left;
  }

.clear::after
  {
  content:"";
  display:block;
  clear:both;
  }
  .main li{
    margin: 20px auto;
  }
</style>
