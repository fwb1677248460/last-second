<template>
  <footer>{{system.copyright}}</footer>
</template>

<script>
export default {
  name: 'foot',
  props: {
    system:Object
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  footer{
    width: 100%;
    margin:0 auto;
    padding: 25px 0;
    color: #666;
    font-size: 15px;
    text-align: center;
    background: #999
  }
</style>
