<template>
  <div
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-slate-900 p-4 rounded shadow-lg">
      <h2 class="text-lg font-bold mb-2">Nova Tarefa</h2>
      <form @submit.prevent="save">
        <div class="mb-4">
          <InputWithLabel
            v-model="task.title"
            label="Título:"
            type="text"
            id="title"
            :rules="titleRules"
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm text-white">
            Descrição:
          </label>
          <textarea
            v-model="task.description"
            id="description"
            class="mt-1 p-2 border w-full rounded text-gray-900"
          ></textarea>
        </div>

        <p v-if="taskError" class="mb-4 text-red-500">{{ taskError }}</p>

        <div class="flex justify-between">
          <button
            type="button"
            @click="closeModal"
            class="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Task } from "@/services/api";
import InputWithLabel from "@/components/basics/InputWithLabel.vue";
import { requiredRule } from "@/utils/validation";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", task: Task): void;
}>();

const props = defineProps<{
  initialTask?: Task;
}>();

const titleRules = [requiredRule];

const task = ref<Task>({ title: "", description: "" });
const taskError = ref("");

const closeModal = () => {
  emit("close");
};

const save = () => {
  if (!validateForm()) {
    taskError.value = "Preencha o título";
    return;
  }

  emit("save", task.value);
};

function validateForm() {
  return !titleRules.find((rule) => rule(task.value.title));
}

if (props.initialTask) {
  console.log("fill with initial task");
  console.log(props.initialTask);

  task.value = { ...props.initialTask };
}
</script>
