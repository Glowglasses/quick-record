<template>
  <div class="wrapper" :title="username">
    <span>{{ slug }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import bus from '@/helpers/bus';
import {login} from '@/helpers/authType';
import {mapActions,mapGetters} from 'vuex';

@Component({
  computed:mapGetters(['slug','username']),
  methods:mapActions(['checkLogin'])
})
export default class Avatar extends Vue {
  slug!: string
  username!: string
  checkLogin!: () => Promise<void>
  created() {
    bus.$on('update:username', (user: login) => {
      if (user.data){
        this.username = user.data.username;
      }
    });
    this.checkLogin()
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