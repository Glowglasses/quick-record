<template>
  <div class="wrapper" ref="wrapper">
    <Avatar class="avatar">
      <div>妙</div>
    </Avatar>
    <router-link to="/noteId" active-class="selected">笔记本详情</router-link>
    <router-link to="/notebooks" active-class="selected">新建笔记本</router-link>
    <router-link to="/trash" active-class="selected">回收站</router-link>
    <div class="logout">
      <i>退出</i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';
@Component({
  components: {Avatar}
})
export default class slideBar extends Vue {
  mounted() {
    let div = this.$refs.wrapper as HTMLDivElement;
    div.style.height = document.documentElement.clientHeight + 'px';
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  text-align: center;
  background-color: #2c333c;
  color: white;
  > .avatar{
    background-color: #f2b81c;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 5px;
    padding-bottom: 5px;
    > div{
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform: translate(-50%,50%);
    }
  }
  > .logout {
    position: absolute;
    bottom: 30px;
    left: 30px;
  }
  > a{
    display: block;
  }
  > :nth-child(1){
    padding: 5px 10px;
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