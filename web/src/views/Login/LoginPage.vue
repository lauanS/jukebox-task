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
            v-model="form.email"
            type="text"
            id="username"
            class="mt-1 p-2 block w-full rounded text-gray-900"
          />
        </div>
        <div>
          <label for="password" class="block font-medium">Senha:</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="mt-1 p-2 block w-full rounded text-gray-900"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
        >
          Entrar
        </button>
        <span class="block">Já possui uma conta? <a>Cadastre-se</a></span>
        <span class="block">Esqueceu sua senha? <a>Redefinir senha</a></span>
        <div v-if="error" class="text-red-500">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import authService from "@/services/auth";

const store = useStore();

const form = ref({
  email: "",
  password: "",
});

const error = ref<string | null>(null);

const login = async () => {
  try {
    await authService.login(form.value);

    const response = await authService.user();
    const user = response.data;

    store.dispatch("auth/login", user);
  } catch (error) {
    console.log(error);
  }
};
</script>
