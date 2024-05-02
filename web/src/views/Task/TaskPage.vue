<template>
  <div>
    <h1 v-if="tasks.length === 0" class="text-2xl font-bold py-8">
      Cadastre suas tarefas clicando no botão novo no canto inferior direito
    </h1>
    <h1 v-else class="text-2xl font-bold py-8">Suas tarefas cadastradas</h1>

    <button
      @click="() => openModal()"
      class="fixed bottom-12 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    >
      Nova Tarefa
    </button>

    <span v-if="tasks.length === 0" class="text-gray-500">
      Nenhuma tarefa cadastrada ainda.
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
          <button
            @click="deleteTask(task.id)"
            class="text-red-500 hover:underline mr-4"
          >
            Excluir
          </button>
          <button
            @click="openModal(task)"
            class="text-blue-500 hover:underline ml-4"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>

  <TaskModal
    v-if="showModal"
    :initial-task="selectedTask"
    @close="closeModal"
    @save="operationModal"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Task } from "@/services/api";
import {
  listTasksService,
  createTaskService,
  deleteTaskService,
  updateTaskService,
} from "@/services/api";
import TaskModal from "@/views/Task/_partials/TaskModal.vue";

type TaskAPI = Task & { id: number };

const tasks = ref<TaskAPI[]>([]);
const selectedTask = ref<TaskAPI>();

const showModal = ref<boolean>(false);

const fetchTasks = async () => {
  const response = await listTasksService();

  if (response && response.data) {
    tasks.value = response.data as TaskAPI[];
  }
};

const operationModal = computed(() => {
  if (selectedTask.value && selectedTask.value.id) {
    const taskId = selectedTask.value.id;

    return (task: Task) => editTask(taskId, task);
  }
  return (task: Task) => saveTask(task);
});

const openModal = (task?: TaskAPI) => {
  selectedTask.value = task;
  showModal.value = true;
};

const closeModal = () => {
  selectedTask.value = undefined;
  showModal.value = false;
};

const saveTask = async ({ title, description }: Task) => {
  try {
    const response = await createTaskService({ title, description });

    console.log(response);

    closeModal();
  } catch (error) {
    console.log("error", error);
  }
};

const editTask = async (taskId: number, task: Task) => {
  try {
    const response = await updateTaskService(taskId, task);

    if (response.status === 200) {
      console.log("update success");
    } else {
      console.log("updated failed with status code", response.status);
    }

    closeModal();
  } catch (error) {
    console.log("error", error);
  }
};

const deleteTask = async (taskId: number) => {
  try {
    const response = await deleteTaskService(taskId);

    console.log(response);
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  } catch (error) {
    console.log("error", error);
  }
};

onMounted(() => {
  fetchTasks();
});
</script>
