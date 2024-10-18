<script setup>
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "radix-vue";
import { Trash2, X } from "lucide-vue-next";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";
const counter = useCounterStore();

const showAlertDialog = ref(false);

</script>

<template>
  <AlertDialogRoot v-model:open="showAlertDialog">
    <AlertDialogTrigger
      
      class="fixed bottom-0 right-0 flex items-center justify-center ml-auto text-xs ButtonDeleteDocument size-8 hover:bg-primary/30 bg-primary/10"
      :class="counter.loaded_id ? 'text-primary' : 'hidden'"
    >
      <Trash2 class="size-4" />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 z-50 bg-black/50" />
      <AlertDialogContent class="md:data-[state=open]:animate-contentShow fixed z-50 w-[95vw] max-w-xs rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-background text-foreground border border-secondary font-mono">
        <AlertDialogTitle class="text-sm font-medium">
          Eliminar documento
        </AlertDialogTitle>
        <AlertDialogDescription class="mt-2 mb-5 text-xs">
          Esta acción no tiene vuelta atrás.
        </AlertDialogDescription>
        <div class="flex justify-between gap-x-2">
          <AlertDialogCancel as-child>
            <button class="bg-secondary ring-1 !ring-secondary text-foreground hover:bg-background hover:ring-2 hover:ring-foreground inline-flex h-[35px] items-center justify-center rounded-[4px] px-3 text-xs font-semibold leading-none focus-visible:ring-2 focus:outline-foreground">
              Cancelar
            </button>
          </AlertDialogCancel>
          <AlertDialogAction as-child>
            <button
              @click="counter.delete_project()"
              class="bg-red-600  text-white hover:bg-red-800  outline-none inline-flex ring-0  hover:ring-2 ring-red-600 h-[35px] items-center justify-center rounded-[4px] px-3 text-xs font-semibold leading-none focus:outline-none"
            >
              Eliminar
            </button>
          </AlertDialogAction>
        </div>
        <AlertDialogCancel class="absolute top-0 size-6 flex justify-center items-center m-3 right-0 z-[999] text-foreground">
          <X class="size-4" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>