<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full p-6 bg-slate-900 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold py-6">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <InputWithLabel
          v-model="form.email"
          label="E-mail:"
          type="text"
          id="email"
          :rules="emailRules"
        />

        <InputWithLabel
          v-model="form.password"
          label="Senha:"
          type="password"
          id="password"
          :rules="passwordRules"
        />

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
        >
          Entrar
        </button>

        <span class="block">
          Não possui uma conta?
          <router-link to="/register">Cadastre-se</router-link>
        </span>

        <div v-if="loginError" class="text-red-500">{{ loginError }}</div>
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
import { requiredRule, emailRule, passwordRule } from "@/utils/validation";

const router = useRouter();
const store = useStore();

const form = ref({
  email: "",
  password: "",
});

const loginError = ref<string | null>(null);

const emailRules = [requiredRule, emailRule];
const passwordRules = [requiredRule, passwordRule];

function validateForm() {
  const invalidEmail = emailRules.find((rule) => rule(form.value.email));
  const invalidPassword = passwordRules.find((rule) =>
    rule(form.value.password)
  );

  return !(invalidEmail || invalidPassword);
}

async function login() {
  try {
    if (!validateForm()) {
      loginError.value =
        "Campos com erro ou não preenchidos, revise antes de prosseguir";
      return;
    }
    loginError.value = "";

    await authService.login(form.value);

    await store.dispatch("login");
    router.push("/");
  } catch (error) {
    console.log(error);
  }
}
</script>
