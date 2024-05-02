<template>
  <div>
    <label :for="props.id" class="block font-medium">{{ props.label }}</label>
    <input
      v-model="model"
      :class="inputClasses"
      :type="props.type"
      :id="props.id"
    />
    <p v-if="error" class="text-red-500 pt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const model = defineModel();

const props = defineProps<{
  id: string;
  label: string;
  type: "text" | "password";
  rules?: Array<(value: string) => string | undefined>;
}>();

const inputClasses = computed(() => {
  return `mt-1 p-2 block w-full rounded text-gray-900 ${
    error.value ? "border-2 border-rose-500" : ""
  }`;
});

const error = ref<string | undefined>(undefined);

watch(model, (newValue) => {
  validateInput(newValue as string);
});

const validateInput = (value: string) => {
  if (!props.rules) return;

  error.value = undefined;

  for (const rule of props.rules) {
    const errorMessage = rule(value);

    if (errorMessage) {
      error.value = errorMessage;
      return;
    }
  }
};
</script>
