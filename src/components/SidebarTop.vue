<script setup>
import ToggleTheme from "@/components/ui/ToggleTheme.vue";
import Tooltip from "@/components/ui/Tooltip.vue";
import DialogInfo from "@/components/DialogInfo.vue";
import ToggleEditable from "./ui/ToggleEditable.vue";
import DriverJsInit from "./Tour.ts";

import { TentTree, ArrowRightToLine, ArrowLeftToLine, MousePointer, Pointer } from "lucide-vue-next";
import { useCounterStore } from "@/stores/counter";
import { useMagicKeys, whenever, breakpointsTailwind, useBreakpoints, useStorage } from "@vueuse/core";
import { onMounted } from "vue";
import DialogSettings from "./DialogSettings.vue";
import DialogCommandMenu from "./ui/DialogCommandMenu.vue";

const counter = useCounterStore();
const breakpoints = useBreakpoints(breakpointsTailwind);
const largerThanLg = breakpoints.greater("lg");


onMounted(() => {
  if (largerThanLg.value) {
    DriverJsInit();
  }
});

const keys = useMagicKeys();
const CtrlM = keys["ctrl+m"];
const magicPreview = keys["ctrl+alt+p"];

whenever(CtrlM, () => {
  counter.showProjects = !counter.showProjects;
});

whenever(magicPreview, () => {
  counter.content_editable = !counter.content_editable;
});

</script>

<template>
  <div
    class="flex items-center justify-between my-0.5  group"
    :class="counter.showProjects ? ' ml-1 mr-0.5 ' : ' flex-col '"
  >
    <button
      @click="counter.showProjects = !counter.showProjects"
      :class="counter.showProjects ? ' ' : ' translate-x-[1px] '"
      class="flex items-center justify-start gap-2 p-2"
    >
      <TentTree class="size-4" />
      <span
        class="text-xs text-foreground"
        v-if="counter.showProjects"
      >Menú</span>
    </button>
    
    <div
      class="grid "
      :class="counter.showProjects ? 'grid-cols-6 gap-0.5' : ' grid-cols-1 px-1 gap-1 mt-1'"
    >
      <DialogInfo />
      <DialogSettings />
      <ToggleTheme />
      <DialogCommandMenu />
      <ToggleEditable />
      <Tooltip
        :name="counter.showProjects ? 'Cerrar panel' : ' Abrir panel'"
        shortcut="Ctrl M"
        :align="counter.showProjects ? 'end' : 'center'"
        :side="counter.showProjects ? 'bottom' : 'right'"
      >
        <button
          v-show="counter.showProjects"
          @click="counter.showProjects = !counter.showProjects"
          class="flex items-center justify-center border interactive border-secondary bg-background hover:bg-secondary/80 size-8"
        >
          <ArrowLeftToLine
            class="size-4"
          />
        </button>
      </Tooltip>
    </div>
    <button
      @click="counter.showProjects = !counter.showProjects"
      v-show="!counter.showProjects"
      class="absolute z-10 inset-1 bottom-2 top-[13.75rem]"
    >
      <ArrowRightToLine class="mx-auto duration-100 opacity-25 size-4 -translate-y-14 group-hover:opacity-90" />
    </button>
  </div>
</template>