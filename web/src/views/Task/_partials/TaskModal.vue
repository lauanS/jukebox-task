<template>
  <div
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-slate-900 p-4 rounded shadow-lg">
      <h2 class="text-lg font-bold mb-2">Nova Tarefa</h2>
      <form @submit.prevent="save">
        <div class="mb-4">
          <label for="title" class="block text-sm text-white">Título:</label>
          <input
            v-model="task.title"
            id="title"
            type="text"
            class="mt-1 p-2 border w-full rounded text-gray-900"
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
import { Task } from "@/services/api";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", task: Task): void;
}>();

const props = defineProps<{
  initialTask?: Task;
}>();

const task = ref<Task>({ title: "", description: "" });

const closeModal = () => {
  emit("close");
};

const save = () => {
  emit("save", task.value);
};

if (props.initialTask) {
  console.log("fill with initial task");
  console.log(props.initialTask);

  task.value = { ...props.initialTask };
}
</script>
