<template>
  <div class="wrapper">
    <span :title="username">{{ slug }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import bus from '@/helpers/bus';
import auth from '@/apis/Auth';
import {login} from '@/helpers/authType';

@Component
export default class Avatar extends Vue {
  username = "未登录"
  get slug() {
    return this.username.charAt(0);
  }
  created() {
    bus.$on('update:username', (user: login) => {
      if (user.data){
        this.username = user.data.username;
      }
    });
    auth.getInfo().then((data) => {
      if (data.isLogin) {
        if (data.data){
          this.username = data.data.username;
        }
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 10px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>