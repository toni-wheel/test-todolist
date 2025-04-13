import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async loadTasks() {
      const saved = localStorage.getItem("tasks");
      if (saved) {
        this.tasks = JSON.parse(saved);
      } else {
        try {
          const response = await fetch("../../public/tasks.json");
          const data = await response.json();
          this.tasks = data;
          this.saveTasks();
        } catch (e) {
          console.error("Ошибка загрузки tasks.json:", e);
        }
      }
    },
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.done = !task.done;
        this.saveTasks();
      }
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
});
