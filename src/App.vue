<template>
  <div id="app">
    <slide-bar/>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
  @import "~@/assets/scss/reset.scss";
  @import "~@/assets/scss/helper.scss";
  body{
    font: $font-song;
  }
</style>
