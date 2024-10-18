<script setup>
import { useCounterStore } from "@/stores/counter";
import {
  Check,
  DatabaseZap,
} from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { shallowRef } from "vue";
import {
  onClickOutside,
} from "@vueuse/core";

import Tooltip from "@/components/ui/Tooltip.vue";


const target = shallowRef(null);
const editing = shallowRef(false);
const counter = useCounterStore();
const { file_name } =
storeToRefs(counter);

const input = shallowRef(file_name);

function editDatabaseTitle() {
  editing.value = !editing.value;
}

onClickOutside(target, () => {
  editing.value = false;
});

</script>

<template>
  <div
    class="DataBaseTitle flex items-center justify-center mx-0.5 text-sm border group bg-secondary/40 hover:bg-secondary/90 border-secondary"
    :class="editing ? ' !border !border-primary' : ' '"
  >
    <button
      v-if="!editing"
      @click="editDatabaseTitle()"
      class="flex items-center justify-between w-full h-8 gap-1 pl-1 text-secondary-foreground"
    >
      <span
        v-if="!file_name"
      > Escriba un título </span>
      <span v-else>
        {{ file_name }}
      </span>
      <Tooltip
        name="Editar nombre de la base de datos local"
        side="top"
        align="end"
      >
        <span
          class="flex items-center justify-center duration-100 border border-transparent group-hover:border size-8 shrink-0 bg-background group-hover:border-primary"
        >
          <DatabaseZap class="size-4 text-primary" />
        </span>
      </Tooltip>
    </button>
    <div
      ref="target"
      v-if="editing"
      class="flex items-center justify-between w-full h-8"
    >
      <input
        type="text"
        ref="focusedEditTitle"
        placeholder="Escriba un título"
        @keyup.enter="editDatabaseTitle()"
        class="w-full h-8 pl-1 text-sm border outline-none bg-secondary text-foreground border-secondary"
        v-model="input"
      >
      <button
        class="flex items-center justify-center outline-none size-8 shrink-0 bg-primary/80 hover:bg-primary/90 focus-visible:ring-2 ring-primary-foreground"
        @click="editDatabaseTitle()"
      >
        <Check class="size-4 text-primary-foreground" />
      </button>
    </div>
  </div>
</template>