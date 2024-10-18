<script setup>

import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleX,
  X,
} from "lucide-vue-next";

import {
  onClickOutside,
  useMagicKeys,
  refDebounced,
  useStorage,
} from "@vueuse/core";

import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "radix-vue";

import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { computed, watch, shallowRef } from "vue";

const showCommand = shallowRef(false);
const target = shallowRef(null);
const editing = shallowRef(false);
const counter = useCounterStore();
const { allItemsTodo, loaded_id, searchTerm, file_name } =
  storeToRefs(counter);

const keys = useMagicKeys();
const CtrlShiftF = keys["ctrl+shift+f"];

const debounced = refDebounced(searchTerm, 300);
const sortOption = useStorage("sortItemsBy", "name");

const input = shallowRef(file_name);

const filteredOptions = computed(() => {
  if (!Array.isArray(allItemsTodo.value)) {
    return [];
  }

  const sortedItems = [...allItemsTodo.value].sort((a, b) => {
    if (sortOption.value === "name") {
      return a.project_data?.name.localeCompare(b.project_data?.name);
    } else if (sortOption.value === "date") {
      return new Date(a.project_data?.date) - new Date(b.project_data?.date);
    }
    return 0;
  });

  return debounced.value === ""
    ? sortedItems
    : sortedItems.filter((item) => {
      return item.project_data?.name
        .toLowerCase()
        .includes(debounced.value.toLowerCase());
    });
});

function handleOpenChange() {
  counter.searchTerm = "";
  showCommand.value = !showCommand.value
}

watch(CtrlShiftF, (v) => {
  if (v) handleOpenChange();
});

function set_document(id) {
  counter.set_project(id);
  showCommand.value = false;
}

onClickOutside(target, () => {
  editing.value = false;
});

</script>

<template>
  <DialogRoot v-model:open="showCommand">
    <DialogPortal>
      <DialogOverlay
        class="bg-background/95 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-[9998]"
      />
      <DialogContent
        class="md:data-[state=open]:animate-contentShow font-mono fixed top-6 md:top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[750px] translate-x-[-50%] md:translate-y-[-50%] bg-background rounded p-4 focus:outline-none z-[9999]"
      >
        <DialogTitle class="text-foreground m-0 text-[17px] font-semibold">
          Buscar
        </DialogTitle>
        <DialogDescription
          as="h4"
          class="mt-3 mb-5 text-sm leading-normal text-foreground"
        >
          Escriba el nombre del proyecto y seleccionar uno para ver/editar
        </DialogDescription>
        <div class="max-w-full mx-auto mt-2 bg-secondary">
          <div
            class="relative flex items-center justify-between w-full gap-0.5 py-0.5 text-xs bg-background ring-secondary/60 focus-within:ring-secondary"
          >
            <div class="relative flex items-center justify-between w-full border border-secondary">
              <input
                v-model="searchTerm"
                autofocus
                placeholder="Filtrar"
                class="w-full h-10 px-3 text-lg outline-none bg-background text-foreground "
              >
              <span
                v-if="!searchTerm"
                class="flex items-center justify-center h-10 mr-0.5 text-foreground text-xs w-7"
              >
                {{ allItemsTodo?.length }}
              </span>
              <button
                v-else
                class="absolute top-0 right-0 flex items-center justify-center h-10 gap-2 px-2 text-xs text-foreground bg-secondary hover:bg-secondary/90"
                @click="searchTerm = ''"
              >
                <span class="min-w-3">{{ filteredOptions.length }}</span>
                <CircleX class="size-3" />
              </button>
            </div>
            <SelectRoot v-model="sortOption">
              <SelectTrigger
                class="flex items-center justify-between w-24 h-10 px-1 text-xs border min-w-24 border-secondary shrink-0 bg-background text-secondary-foreground"
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
                        <SelectItemIndicator class="absolute right-0 w-[25px] inline-flex items-center justify-center">
                          <Check class="size-4" />
                        </SelectItemIndicator>
                        <SelectItemText> Nombre </SelectItemText>
                      </SelectItem>
                      <SelectItem
                        class="text-xs leading-none text-foreground flex items-center h-8 px-1 py-2 pr-12 relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-secondary/50 data-[highlighted]:text-foreground"
                        value="date"
                      >
                        <SelectItemIndicator class="absolute right-0 w-[25px] inline-flex items-center justify-center">
                          <Check class="size-4" />
                        </SelectItemIndicator>
                        <SelectItemText> Fecha </SelectItemText>
                      </SelectItem>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>
          <div class="overflow-x-hidden overflow-y-auto h-96">
            <ScrollAreaRoot
              class="w-full overflow-hidden rounded h-96"
              style="--scrollbar-size: 10px"
            >
              <ScrollAreaViewport class="w-full h-full rounded">
                <div class="py-1 px-0.5 flex flex-col justify-start items-start relative gap-1">
                  <div
                    v-for="item in filteredOptions"
                    :key="item.id"
                    class="flex flex-row items-center justify-between w-full"
                  >
                    <button
                      class="flex py-1.5 rounded w-full  items-center outline-none justify-start gap-2 text-left focus-within:ring-1 ring-primary"
                      :class="loaded_id === item.id ? 'text-primary' : ' text-foreground '"
                      @click="set_document(item.id)"
                    >
                      <ArrowRight class="size-4 shrink-0 " />
                      <p class="@sm:max-w-full max-w-[40rem] line-clamp-1 text-foreground">
                        {{ item.project_data.name }}
                      </p>
                    </button>
                  </div>
                </div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar
                class="flex select-none touch-none p-0.5 bg-secondary transition-colors duration-[160ms] ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollAreaThumb
                  class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
                />
              </ScrollAreaScrollbar>
              <!-- <ScrollAreaScrollbar
          class="flex select-none touch-none p-0.5 bg-secondary transition-colors duration-[160ms] ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollAreaThumb
            class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
          />
        </ScrollAreaScrollbar> -->
            </ScrollAreaRoot>
          </div>
        </div>
        <div class="flex justify-end mt-2 md:mt-3">
          <DialogClose as-child>
            <button
              class="bg-secondary text-foreground hover:bg-background hover:ring-2 hover:ring-foreground text-sm focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Cerrar ventana
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="absolute inline-flex items-center justify-center appearance-none top-4 text-foreground hover:bg-secondary/80 right-3 size-7 focus:shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:text-primary"
          aria-label="Close"
        >
          <X />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
