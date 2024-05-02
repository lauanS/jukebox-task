<template>
  <nav class="bg-slate-800 p-4">
    <div class="flex items-center justify-between">
      <div>
        <router-link to="/" class="font-bold">Jukebox Task</router-link>
      </div>
      <div>
        <template v-if="isAuthenticated">
          <button @click="logout" class="mr-5 hover:underline">Logout</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const logout = () => {
  store.dispatch("logout");
  router.push("/login");
};
</script>

<style scoped lang="scss"></style>
