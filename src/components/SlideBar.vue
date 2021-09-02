<template>
  <div class="wrapper">
    <div>头像</div>
    <router-link to="/noteId">笔记本详情</router-link>
    <router-link to="/notebooks">新建笔记本</router-link>
    <router-link to="/trash">回收站</router-link>
    <div>
      <i>退出</i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class slideBar extends Vue {

}
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 10%;
    display: flex;
  }
</style>