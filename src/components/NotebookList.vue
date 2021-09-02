<template>
  <div class="wrapper">笔记本列表</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NotebookList extends Vue {

}
</script>

<style lang="scss" scoped>
  .wrapper{
    flex-grow: 1;
  }
</style>