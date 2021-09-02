<template>
  <div class="wrapper">回收站</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class TrashDetail extends Vue {

}
</script>

<style lang="scss" scoped>
  .wrapper{
    flex-grow: 1;
  }
</style>