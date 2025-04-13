<template>
  <div class="task-list">
    <ul class="task-list__items">
      <li class="task-list__item" v-for="task in tasks" :key="task.id">
        <label class="task-list__label">
          <span
            class="task-list__checkbox-wrapper"
            :class="{ checked: task.done }"
          >
            <input
              type="checkbox"
              v-model="task.done"
              class="task-list__checkbox"
            />
            <img
              v-if="task.done"
              src="../images/svg/check.svg"
              alt="done"
              class="task-list__icon"
            />
          </span>
          <span class="task-list__title" :class="{ done: task.done }">
            {{ task.title }}
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from "vue";
import { useTaskStore } from "../stores/taskStore";

const store = useTaskStore();

onMounted(() => {
  store.loadTasks();
});

const tasks = computed(() => store.tasks);

watch(
  tasks,
  () => {
    store.saveTasks();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.task-list {
  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    margin-bottom: 14px;
    background: #ffffff;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    transition: transform 0.2s ease, background 0.3s ease;
    display: flex;
    align-items: center;
    user-select: none;

    &:hover {
      transform: translateY(-2px);
      background: #f8fafc;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    gap: 14px;
  }

  &__checkbox-wrapper {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: #e3eaf0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    transition: background 0.3s ease;

    &.checked {
      background: #4caf50;
    }
  }

  &__checkbox {
    appearance: none;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 2;
  }

  &__icon {
    width: 18px;
    height: 18px;
    stroke: white;
    background-color: transparent;
    display: block;
    z-index: 1;
  }

  &__title {
    font-size: 16px;
    color: #2e3a4e;
    transition: color 0.2s ease;

    &.done {
      text-decoration: line-through;
      color: #a0aab8;
    }
  }
}
</style>
