<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { Plus } from "lucide-vue-next";
import {  breakpointsTailwind, useBreakpoints, } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const largerThanLg = breakpoints.greater("lg");
const counter = useCounterStore();
const { loaded_id } = storeToRefs(counter);

function new_document() {
  counter.clear_editor();
  counter.content_editable = true;
  if (!largerThanLg.value) {
    counter.showProjects = false;
  }
}

</script>

<template>
  <button
    @click="loaded_id === '' ? null : new_document()"
    class="CreateNewButton flex items-center justify-center gap-2 text-xs size-8 w-full text-left bg-primary focus-within:ring-1 ring-primary"
    :class="{
      '!bg-secondary !ring-secondary !text-primary-foreground': loaded_id === null,
      '!bg-secondary/30 !text-primary ': loaded_id === '',
    }"
  >
    <Plus
      class="size-4"
    />
  </button>
</template>