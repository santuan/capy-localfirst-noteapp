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
import { X } from "lucide-vue-next";
import { onMounted, shallowRef, watch } from "vue";
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();
import { storeToRefs } from "pinia";
import {  refDebounced } from "@vueuse/core";
import { toast } from 'vue-sonner'



const { file_name, showSettings } = storeToRefs(counter);

const input = shallowRef(file_name);
const showDeleteModal = shallowRef(false);
const debounced = refDebounced(input, 100);

watch(debounced, (v) => {
  if (v) counter.share_database();
});

function clear(){
  counter.clearDatabase();
  setTimeout(() => {
    toast.success('Base de datos eliminada')
    showDeleteModal.value = false
    showSettings.value = false
  }, 300);
}

onMounted(() => {
  counter.share_database();
});
</script>

<template>
  <DialogRoot v-model:open="showDeleteModal">
    <DialogTrigger
      class="bg-destructive  text-white hover:bg-red-800  outline-none inline-flex ring-0  hover:ring-2 ring-destructive h-8 items-center justify-center rounded-[4px] px-3 text-xs font-semibold leading-none focus:outline-none gap-2 focus-visible:ring-2 focus-visible:ring-white"
      aria-label="Delete DB"
    >
      Eliminar DB
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-secondary/90 data-[state=open]:animate-overlayShow fixed inset-0 z-[100]"
      />
      <DialogContent
        class="data-[state=open]:animate-contentShow font-mono fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-3 md:p-[25px] shadow focus:outline-none z-[9000]"
      >
        <DialogClose
          class="text-foreground hover:bg-secondary/80 hover:text-foreground  absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:text-primary"
          aria-label="Close"
        >
          <X class="size-4 text-primary-foreground" />
        </DialogClose>
        <DialogTitle class="text-foreground m-0 text-[17px] font-semibold">
          Eliminar Base de datos local
        </DialogTitle>
        <DialogDescription class="mt-3 text-sm text-foreground">
          Una vez que realices esta acción, no podrás recuperar los datos.
        </DialogDescription>
        <div
          class="flex items-center justify-end gap-3 mt-6"
        >
          <DialogClose as-child>
            <button
              class="bg-background border-secondary border text-foreground hover:bg-backgorund/80 text-xs inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Cancelar
            </button>
          </DialogClose>
          <button
            @click="clear()"
            class="bg-red-600 text-white hover:bg-red-600/80 text-xs inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none hover:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Eliminar
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
