<template>
  <div class="wrapper" ref="wrapper">
    <Avatar class="avatar"/>
    <router-link to="/note" active-class="selected">
      <i class="el-icon-notebook-1">笔记</i>
    </router-link>
    <router-link to="/notebooks" active-class="selected">
      <i class="el-icon-notebook-2">笔记本</i>
    </router-link>
    <router-link to="/trash" active-class="selected">
      <i class="el-icon-delete-solid">回收站</i>
    </router-link>
    <div class="logout" @click="logout">
      <i>退出</i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';
import auth from '@/apis/auth';
import {Message} from 'element-ui';
@Component({
  components: {Avatar}
})
export default class slideBar extends Vue {
  mounted() {
    let div = this.$refs.wrapper as HTMLDivElement;
    div.style.height = document.documentElement.clientHeight + 'px'
    window.onresize = () => {
      let div = this.$refs.wrapper as HTMLDivElement;
      div.style.height = document.documentElement.clientHeight + 'px';
    }
  }
 logout(){
    auth.logout().then(()=>{
      this.$router.push('/login')
      Message.success("账户已退出")
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  text-align: center;
  background-color: #2c333c;
  color: white;
  font-size: 13px;
  > .avatar{
    background-color: #f2b81c;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 16px;
  }
  > .logout {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
  }
  > a{
    display: block;
  }
  > :nth-child(2){
    padding: 5px 10px;
  }
  > :nth-child(3){
    padding: 5px 10px;
  }
  > :nth-child(4){
    padding: 5px 10px;
  }
}

.selected {
  background-color: #5e6266;
}
</style>