<template>
  <div>
    <h1 class="text-2xl font-bold py-8">Jukebox Task</h1>

    <button
      @click="openModal"
      class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Nova Tarefa
    </button>

    <span v-if="tasks.length === 0" class="text-gray-500">
      Nenhuma tarefa encontrada.
    </span>

    <div
      class="px-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="task in tasks"
        :key="task.id"
        class="w-full p-6 shadow border border-gray-800 rounded-lg bg-slate-900 hover:bg-slate-800"
      >
        <h2 class="mb-2 text-lg font-bold text-white">
          {{ task.title }}
        </h2>

        <p class="font-normal text-gray-100">
          {{ task.description }}
        </p>

        <div class="space-x-2 mt-5">
          <button @click="deleteTask(task.id)" class="text-red-500">
            Excluir
          </button>
          <button @click="editTask(task)" class="text-blue-500">Editar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

type Task = {
  id: number;
  title: string;
  description: string;
};

const tasks = ref<Task[]>([]);

const showModal = ref<boolean>(false);

const fetchTasks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  tasks.value = [
    { id: 1, title: "Tarefa 1", description: "Descrição da tarefa 1" },
    { id: 2, title: "Tarefa 2", description: "Descrição da tarefa 2" },
    { id: 3, title: "Tarefa 3", description: "Descrição da tarefa 3" },
    { id: 4, title: "Tarefa 4", description: "Descrição da tarefa 4" },
    { id: 5, title: "Tarefa 5", description: "Descrição da tarefa 5" },
    { id: 6, title: "Tarefa 6", description: "Descrição da tarefa 6" },
  ];
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveTask = (task: Task) => {
  console.log("Salvar:", task);
  closeModal();
};

const editTask = (task: Task) => {
  console.log("Editar:", task);
};

const deleteTask = (taskId: number) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
};

onMounted(() => {
  fetchTasks();
});
</script>
