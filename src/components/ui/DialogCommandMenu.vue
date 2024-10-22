<script setup lang="ts">
import { ref } from 'vue'
import {
  ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxRoot, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, VisuallyHidden } from 'radix-vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import Tooltip from "./Tooltip.vue";

import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { Search } from 'lucide-vue-next';
import SearchItem from '../SearchItem.vue';
const counter = useCounterStore();
const { allItemsTodo, } =
  storeToRefs(counter);
const open = ref(false)

const keys = useMagicKeys();
const magicCommandMenu = keys["ctrl+alt+o"];

whenever(magicCommandMenu, (n) => {
  if (n)
    open.value = true
})

function handleSelect(id) {
  open.value = false
  counter.set_project(id);
}

</script>

<template>
  <DialogRoot v-model:open="open">
    <Tooltip
      name="Barra comandos"
      :side="counter.showProjects ? 'bottom' : 'right'"
      shortcut="ctrl + alt + o"
      :align="counter.showProjects ? 'end' : 'center'"
    >
      <DialogTrigger
        class="flex items-center justify-center border interactive border-secondary hover:bg-secondary/80 bg-background size-8"
      >
        <Search class="size-4" />
      </DialogTrigger>
    </Tooltip>
    <DialogPortal>
      <DialogOverlay class="bg-background/80 fixed inset-0 z-[90]" />
      <DialogContent
        class="fixed top-[15%] left-[50%] max-h-[85vh] w-[90vw] max-w-[40rem] translate-x-[-50%] text-sm overflow-hidden border bg-background border-muted-foreground/30 focus:outline-none z-[100]"
      >
        <VisuallyHidden>
          <DialogTitle>Command Menu</DialogTitle>
          <DialogDescription>Search for command</DialogDescription>
        </VisuallyHidden>

        <ComboboxRoot :open="true">
          <ComboboxInput
            placeholder="Buscar..."
            class="sticky top-0 right-0 font-mono bg-background border-b border-secondary w-full px-4 py-3 text-foreground outline-none placeholder-muted-foreground"
            @keydown.enter.prevent
          />
          <ComboboxContent
            class="border-t border-muted-foreground/30 p-2 overflow-y-auto h-[20rem]"
            @escape-key-down="open = false"
          >
            <ComboboxEmpty class="text-center text-muted-foreground p-4">
              Sin resultados
            </ComboboxEmpty>

            <ComboboxGroup>
              <ComboboxLabel class="px-4 text-muted-foreground font-semibold mt-3 mb-3 font-mono">
                Documentos
              </ComboboxLabel>
              <ComboboxItem
                v-for="item in allItemsTodo"
                :key="item.id"
                @select="handleSelect(item.id)"
                :value="item.project_data.name"
                class="cursor-default font-mono text-xs px-4 py-2 rounded-md text-foreground data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span>{{ item.project_data.name }}</span>
                <!-- <SearchItem :data="item" /> -->
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxContent>
        </ComboboxRoot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>