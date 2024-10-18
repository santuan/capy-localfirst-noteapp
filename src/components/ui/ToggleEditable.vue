<script setup>
import { useCounterStore } from "@/stores/counter";
import Tooltip from "@/components/ui/Tooltip.vue";
import { BookText, PencilLine } from "lucide-vue-next";
const counter = useCounterStore();
</script>

<template>
  <Tooltip
    :name="
      counter.content_editable
        ? 'Cambiar a previsualizar'
        : 'Cambiar a modo editable'
    "
    shortcut="Ctrl Shift E"
    side="bottom"
  >
    <button
      @click="counter.toggleEditable"
      class="flex items-center justify-center border interactive border-secondary ToggleEditable bg-background hover:bg-secondary/80 size-8"
    >
      <BookText
        class="size-4"
        v-show="counter.content_editable"
      />
      <PencilLine
        class="size-4"
        v-show="!counter.content_editable"
      />
    </button>
  </Tooltip>
</template>
