<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full p-6 bg-slate-900 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold py-6">Cadastre-se</h2>
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label for="username" class="block font-medium">Nome:</label>
          <input
            v-model="form.name"
            type="text"
            id="username"
            class="mt-1 p-2 block w-full rounded text-gray-900"
          />
        </div>
        <div>
          <label for="email" class="block font-medium">E-mail:</label>
          <input
            v-model="form.email"
            type="text"
            id="email"
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
        <div>
          <label for="password_confirmation" class="block font-medium">
            Confirmar senha:
          </label>
          <input
            v-model="form.password_confirmation"
            type="password_confirmation"
            id="password_confirmation"
            class="mt-1 p-2 block w-full rounded text-gray-900"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
        >
          Entrar
        </button>
        <span class="block">
          Já possui uma conta?
          <router-link to="/login">Entrar</router-link>
        </span>
        <span class="block">
          Esqueceu sua senha?
          <router-link to="/forgot-password">Redefinir senha</router-link>
        </span>
        <div v-if="registerError" class="text-red-500">{{ registerError }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import authService from "@/services/auth";

const router = useRouter();
const store = useStore();

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const registerError = ref<string | null>(null);
const registerLoading = ref(false);

const register = async () => {
  try {
    registerLoading.value = true;
    await authService.register(form.value);

    registerError.value = "";

    registerLoading.value = false;

    await store.dispatch("login");
    router.push("/");
  } catch (error: any) {
    if (error?.response?.status === 422) {
      registerError.value = "Dados informados são inválidos";
      registerLoading.value = false;
      return;
    }
    registerError.value = "Ocorreu um erro";
    registerLoading.value = false;
  }
};
</script>
