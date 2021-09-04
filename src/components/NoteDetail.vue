<template>
  <div>笔记本详情</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import auth from '@/apis/Auth';

@Component
export default class NoteDetail extends Vue {
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

</style>