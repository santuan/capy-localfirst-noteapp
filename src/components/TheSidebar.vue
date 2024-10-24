<script setup>
import SidebarTop from "@/components/SidebarTop.vue";
import SidebarProjects from "@/components/SidebarProjects.vue";
import SidebarBottom from "./SidebarBottom.vue";
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();

import { useDropZone } from "@vueuse/core";
import { shallowRef, watch } from "vue";
const dropZoneRef = shallowRef();
const { isOverDropZone } = useDropZone(dropZoneRef);

watch(isOverDropZone, (v) => {
  if (v) counter.showImportModal = !counter.showImportModal;
});

</script>

<template>
  <div>
    <header
      ref="dropZoneRef"
      class="fixed top-0 z-[60] !select-none flex flex-col justify-start h-screen border-r lg:sticky bg-background border-secondary"
      :class="counter.showProjects ? 'min-w-80 max-w-80' : ' '"
    >
      <SidebarTop />
      <SidebarProjects v-show="counter.showProjects" />
      <SidebarBottom v-show="counter.showProjects" />
    </header>
    <button
      v-show="counter.showProjects"
      @click="counter.showProjects = !counter.showProjects"
      class="fixed inset-0 !z-50 bg-background/90 !border-0 !ring-0 !outline-none lg:hidden"
    />
  </div>
</template>