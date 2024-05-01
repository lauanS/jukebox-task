<template>
  <div>
    <h1 class="text-2xl font-bold py-8">Jukebox Task</h1>

    <button
      @click="() => openModal()"
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

  <TaskModal
    v-if="showModal"
    :task="selectedTask || undefined"
    @close="closeModal"
    @save="saveTask"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getTasks } from "@/services/api";
import TaskModal from "@/views/Task/_partials/TaskModal.vue";

type Task = {
  id: number;
  title: string;
  description: string;
};

const tasks = ref<Task[]>([]);
const selectedTask = ref<Task>();

const showModal = ref<boolean>(false);

const fetchTasks = async () => {
  const response = await getTasks();

  if (response && response.data) {
    tasks.value = response.data as Task[];
  }
};

const openModal = (task?: Task) => {
  selectedTask.value = task;
  showModal.value = true;
};

const closeModal = () => {
  selectedTask.value = undefined;
  showModal.value = false;
};

const saveTask = (title: string, description: string) => {
  console.log("Salvar:", { title, description });
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
