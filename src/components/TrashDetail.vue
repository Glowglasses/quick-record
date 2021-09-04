<template>
  <div class="wrapper">回收站</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import auth from '@/apis/auth';

@Component
export default class TrashDetail extends Vue {
  beforeCreate(){
    auth.getInfo().then((data) => {
      if(!data.isLogin){
        this.$router.push("/login")
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    flex-grow: 1;
  }
</style>