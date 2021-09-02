<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Avatar extends Vue {

}
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #f2b81c;
    margin: 10px 0;
  }
</style>