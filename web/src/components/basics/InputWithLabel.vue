<template>
  <div>
    <label :for="props.id" class="block font-medium">{{ props.label }}</label>
    <input
      v-model="model"
      :class="inputClasses"
      :type="props.type"
      :id="props.id"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel();

const props = defineProps<{
  id: string;
  label: string;
  type: "text" | "password";
}>();

const inputClasses = "mt-1 p-2 block w-full rounded text-gray-900";
</script>
