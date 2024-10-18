import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      save_on_load: false,
    };
  },
  persist: true,
  actions: {
    toggle_save_on_load() {
      this.save_on_load = !this.save_on_load;
    }
  },
});