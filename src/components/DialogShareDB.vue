<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";
import { Download, X } from "lucide-vue-next";
import { onMounted, shallowRef, watch } from "vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import {  refDebounced } from "@vueuse/core";

const counter = useCounterStore();
const { file_name, showShareModal } = storeToRefs(counter);
const input = shallowRef(file_name);
const debounced = refDebounced(input, 100);

watch(debounced, (v) => {
  if (v) counter.share_database();
});

onMounted(() => {
  counter.share_database();
});
</script>

<template>
  <DialogRoot v-model:open="showShareModal">
    <DialogTrigger
      class="flex items-center justify-center h-12 gap-2 px-2 text-xs border outline-none border-secondary bg-background hover:bg-background/50 focus-visible:border-primary focus-visible:bg-primary/10"
      aria-label="Update dimensions"
    >
      <Download class="size-4" />
      <span class="">ExportarDB</span>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-secondary/90 data-[state=open]:animate-overlayShow fixed inset-0 z-[200]"
      />
      <DialogContent
        class="data-[state=open]:animate-contentShow font-mono fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-3 md:p-[25px] shadow focus:outline-none z-[9000]"
      >
        <DialogTitle class="text-foreground m-0 text-[17px] font-semibold">
          ExportarDB
        </DialogTitle>
        <DialogDescription class="mt-3 text-sm text-foreground">
          Nombre del archivo
        </DialogDescription>
        <div class="flex gap-2 mb-2">
          <input
            type="text"
            class="w-full h-8 px-2 border bg-background text-foreground border-border"
            v-model="input"
          >
          <button
            class="px-5 ml-auto text-xs font-medium border bg-primary border-secondary shrink-0 text-primary-foreground hover:bg-primary/80 focus:outline-none"
            @click="counter.export_database(input.value)"
          >
            Exportar DB
          </button>
        </div>
        <div
          class="flex items-center justify-end mt-6"
        >
          <DialogClose as-child>
            <button
              class="bg-secondary text-foreground hover:bg-backgorund/80 text-xs inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Cerrar ventana
            </button>
          </DialogClose>
        </div>
        <DialogClose class="absolute top-0 size-6 flex justify-center items-center m-3 right-0 z-[999] text-foreground">
          <X class="size-4" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
