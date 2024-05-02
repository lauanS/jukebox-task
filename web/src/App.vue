<template>
  <NavigationBar />
  <router-view />
</template>

<script setup lang="ts">
import NavigationBar from "@/components/NavigationBar.vue";
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;

  background-color: #011329;

  min-height: 100vh;
}
</style>
