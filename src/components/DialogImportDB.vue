<script setup>
import { Upload, X, DatabaseZap } from "lucide-vue-next";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "radix-vue";

import { shallowRef } from "vue";

import { useCounterStore } from "@/stores/counter";
import { useFileDialog, useTimeoutFn, useDropZone, useMagicKeys, whenever } from "@vueuse/core";

const keys = useMagicKeys();
const magicImportDB = keys["ctrl+alt+i"];

whenever(magicImportDB, (n) => {
  if (n)
    counter.showImportModal = true
})

const counter = useCounterStore();
const dropZoneRef = shallowRef();
const filesData = shallowRef([]);
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const { open, onChange } = useFileDialog({
  accept: "application/json",
});

onChange((files) => {
  if (files) {
    if (files[0].type !== "application/json") {
      alert("El archivo seleccionado no es un archivo JSON");
      return;
    }
    counter.import_database(files[0]);
    filesData.value = files;
    useTimeoutFn(() => {
      filesData.value = [];
    }, 300);
  }
});

function onDrop(files) {
  if (files) {
    if (files[0].type !== "application/json") {
      alert("El archivo seleccionado no es un archivo JSON");
      return;
    }
    counter.import_database(files[0]);
    counter.showProjects = true;
    filesData.value = files;
    useTimeoutFn(() => {
      filesData.value = [];
    }, 300);
  }
}
</script>

<template>
  <AlertDialogRoot v-model:open="counter.showImportModal">
    <AlertDialogTrigger
      class="flex items-center justify-center h-12 gap-2 px-2 text-xs border outline-none border-secondary bg-background hover:bg-background/50 focus-visible:border-primary focus-visible:bg-primary/10"
    >
      <Upload class="size-4" />
      <span class="">ImportarDB</span>
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="bg-secondary/80 data-[state=open]:animate-overlayShow fixed inset-0 z-[70]"
      />
      <AlertDialogContent>
        <div
          class="dropZone fixed flex-col font-mono inset-0 text-foreground z-[90] justify-center flex items-center"
        >
          <div
            class="flex flex-col items-center justify-center w-full"
            v-auto-animate
          >
            <div
              class="relative flex flex-col items-center justify-center w-full max-w-xl gap-2 px-3 pt-10 pb-6 text-center shadow bg-background text-pretty"
              ref="dropZoneRef"
              :class="isOverDropZone ? ' border-animated ' : '   '"
            >
              <DatabaseZap class="size-12" />
              <AlertDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
                ImportarDB
              </AlertDialogTitle>
              <AlertDialogDescription
                class="text-foreground mt-4 text-pretty max-w-96 text-center mb-3 text-[15px] leading-normal"
              >
                Selecciona o arrastrar un archivo JSON exportado desde esta app.
              </AlertDialogDescription>
              <button
                type="button"
                @click="open()"
                class="mb-4 text-sm font-semibold underline text-primary underline-offset-2"
              >
                Seleccionar archivo JSON
              </button>
              <AlertDialogCancel
                class="bg-secondary text-foreground hover:bg-backgorund/80 text-xs inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogCancel class="absolute top-0 size-6 flex justify-center items-center m-3 right-0 z-[999] text-foreground">
                <X class="size-4" />
              </AlertDialogCancel>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style>
.border-animated:before {
  @apply absolute inset-2;
  content: "";
  background: linear-gradient(90deg, hsl(var(--primary)) 50%, transparent 50%),
    linear-gradient(90deg, hsl(var(--primary)) 50%, transparent 50%),
    linear-gradient(0deg, hsl(var(--primary)) 50%, transparent 50%),
    linear-gradient(0deg, hsl(var(--primary)) 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size:
    20px 2px,
    20px 2px,
    2px 20px,
    2px 20px;
  background-position:
    0px 0px,
    400px 100%,
    0px 70px,
    100% 0px;
  padding: 0;
  animation: border-dance 30s infinite linear;
}

@keyframes border-dance {
  0% {
    background-position:
      /* 0px 0px,
      300px 155px,
      0px 150px,
      445px 0px; */
      0px 0px,
      0 100%,
      0px 0px,
      100% 0px;
  }

  100% {
    background-position:
      /* 300px 0px,
      0px 155px,
      0px 0px,
      445px 150px; */
      -50% 0px,
      50% 100%,
      0px 50%,
      100% -50%;
  }
}
</style>
