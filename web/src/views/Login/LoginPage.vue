<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full p-6 bg-slate-900 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold py-6">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="username" class="block font-medium">
            Nome de usuário:
          </label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="mt-1 block w-full rounded text-gray-900"
          />
        </div>
        <div>
          <label for="password" class="block font-medium">Senha:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full rounded text-gray-900"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
        >
          Entrar
        </button>
        <span class="block">Já possui conta? <a>Cadastre-se</a></span>
        <span class="block">Esqueceu sua senha? <a>Redefina sua senha</a></span>
        <div v-if="error" class="text-red-500">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const username = ref("");
const password = ref("");
const error = ref<string | null>(null);

const login = () => {
  console.log("LoginPage::login");
  console.log(
    store.dispatch("auth/login", {
      email: "lauan.s.souza@gmail.com",
      password: "Senha123",
    })
  );
};
</script>
