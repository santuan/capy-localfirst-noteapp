<script setup>
import {
  Check,
  ChevronDown,
} from "lucide-vue-next";

import {
  useStorage,
} from "@vueuse/core";

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "radix-vue";

const sortOption = useStorage("sortItemsBy", "name");


</script>

<template>
  <SelectRoot v-model="sortOption">
    <SelectTrigger
      class="flex items-center justify-between w-full h-8 px-1 text-xs border min-w-24 border-secondary shrink-0 bg-background text-secondary-foreground"
      aria-label="Customise options"
    >
      <SelectValue placeholder="Seleccionar" />
      <ChevronDown class="h-3.5 w-3.5" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent
        class="min-w-[160px] bg-background will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] font-mono border border-secondary"
        position="popper"
        :side-offset="5"
        align="end"
      >
        <SelectViewport class="">
          <SelectLabel class="p-2 text-xs font-medium text-primary">
            Ordenar
          </SelectLabel>
          <SelectGroup class="p-1">
            <SelectItem
              class="text-xs leading-none text-foreground flex items-center h-8 px-1 py-2 pr-12 relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-secondary/50 data-[highlighted]:text-foreground"
              value="name"
            >
              <SelectItemIndicator class="absolute text-primary right-0 w-[25px] inline-flex items-center justify-center">
                <Check class="size-4" />
              </SelectItemIndicator>
              <SelectItemText> Nombre </SelectItemText>
            </SelectItem>
            <SelectItem
              class="text-xs leading-none text-foreground flex items-center h-8 px-1 py-2 pr-12 relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-secondary/50 data-[highlighted]:text-foreground"
              value="date"
            >
              <SelectItemIndicator class="absolute text-primary right-0 w-[25px] inline-flex items-center justify-center">
                <Check class="size-4" />
              </SelectItemIndicator>
              <SelectItemText> Fecha </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
