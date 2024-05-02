<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full p-6 bg-slate-900 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold py-6">Cadastre-se</h2>
      <form @submit.prevent="register" class="space-y-4">
        <InputWithLabel
          v-model="form.name"
          label="Nome:"
          type="text"
          id="username"
        />

        <InputWithLabel
          v-model="form.email"
          label="E-mail:"
          type="text"
          id="email"
        />

        <InputWithLabel
          v-model="form.password"
          label="Senha:"
          type="password"
          id="password"
        />

        <InputWithLabel
          v-model="form.password_confirmation"
          label="Confirmar senha:"
          type="password"
          id="password_confirmation"
        />

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
        >
          Cadastrar
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
import InputWithLabel from "@/components/basics/InputWithLabel.vue";

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
