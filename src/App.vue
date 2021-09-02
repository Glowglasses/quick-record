<template>
  <div id="app">
    <slide-bar/>
    <router-view/>
  </div>
</template>
<style lang="scss">
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";
  #app{
    font: $font-hei;
    font-size: $font-size;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
</style>
