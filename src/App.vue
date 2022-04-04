<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "./views/shared/AppHeader.vue";
export default {
  components: {
    appHeader: AppHeader,
  },
  watch: {
    $route() {
      this.$store.dispatch("onStart")
    }
  },
  mounted() {
    this.$store.dispatch("onStart")
  }
};
</script>

<style>
#app {
  background: #e35869;
  
}
</style>