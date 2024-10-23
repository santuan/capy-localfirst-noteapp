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
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "radix-vue";
import { X, MousePointer, DatabaseZap, Pointer, Plane, Settings2, BookOpenCheck, BookOpen } from "lucide-vue-next";
import Tooltip from "./ui/Tooltip.vue";
import { useCounterStore } from "@/stores/counter";
import { useStorage, useMagicKeys, whenever, useMousePressed } from '@vueuse/core'

import ToggleTheme from "./ui/ToggleTheme.vue";
import { useSettingsStore } from "@/stores/settings";
import DialogDeleteDB from "./DialogDeleteDB.vue";
import DriverJsInit from "./Tour.ts";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const settings = useSettingsStore();

const counter = useCounterStore();
const cursorPointer = useStorage("cursor", true);
const keys = useMagicKeys();
const magicSettings = keys["ctrl+alt+w"];
const { showSettings, content_editable } = storeToRefs(counter);
const toggleCursor = () => {
  cursorPointer.value = !cursorPointer.value;
};

whenever(magicSettings, (n) => {
  if (n)
  showSettings.value = true
})

const toggleTour = () => {
  localStorage.setItem('product_tour_seen', 'false');
  showSettings.value = false;
  content_editable.value = true;
  setTimeout(() => {
    DriverJsInit();
  }, 300);
};

const isMobile = ref(false)

if(window.matchMedia("(any-hover: none)").matches) {
  isMobile.value = true
} else {
  isMobile.value = false
}

</script>

<template>
  <DialogRoot v-model:open="showSettings">
    <Tooltip
      name="Configuraciones"
      :side="counter.showProjects ? 'bottom' : 'right'"
    >
      <DialogTrigger
        class="flex items-center justify-center border interactive border-secondary hover:bg-secondary/80 bg-background size-8"
      >
        <Settings2 class="size-4" />
      </DialogTrigger>
    </Tooltip>
    <DialogPortal>
      <DialogOverlay
        class="bg-background/95 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-[60]"
      />
      <DialogContent
        class="md:data-[state=open]:animate-contentShow font-mono fixed top-6 md:top-[50%] left-[50%] max-h-[85vh] w-[98vw] max-w-[750px] translate-x-[-50%] md:translate-y-[-50%] bg-background rounded py-4 md:p-4 focus:outline-none z-[100] "
      >
        <DialogTitle class="text-foreground px-3 md:px-0 m-0 text-[17px] font-semibold">
          Configuraciones
        </DialogTitle>
        <DialogDescription class="mt-1 text-sm px-3 md:px-0 text-muted-foreground">
          Administre sus preferencias para <span>{{ isMobile ? 'touch' : 'mouse y teclado' }}.</span> 
        </DialogDescription>
        <ScrollAreaRoot
          class="w-full border h-[78vh] mt-6 md:h-[70vh] border-secondary"
          style="--scrollbar-size: 10px"
        >
          <ScrollAreaViewport class="w-full h-full">
            <article class="max-w-full p-3 mx-auto prose dark:prose-invert">
              <div class="grid gap-2">
                <div
                  v-if="!isMobile"
                  class="flex-row items-start justify-between flex gap-3 pt-2 p-3 border border-secondary"
                >
                  <div
                    class="space-y-0.5"
                    v-auto-animate
                  >
                    <label class="text-sm font-medium ">
                      Tour
                    </label>
                    <p class="text-xs text-muted-foreground">
                      Iniciar un recorrido por las principales funciones de la app.
                    </p>
                  </div>
                  <button
                    @click="toggleTour()"
                    class="flex focus:border-primary ring-foreground items-center justify-center border border-secondary bg-background shrink-0 hover:bg-secondary/80 size-8"
                  >
                    <Plane class="size-5" />
                  </button>
                </div>
                <div
                  v-if="!isMobile"
                  class="flex-row items-start justify-between flex p-3 border border-secondary"
                >
                  <div class="space-y-0.5">
                    <label class="text-sm font-medium ">
                      Puntero del mouse </label>
                    <p class="text-xs text-muted-foreground">
                      Activa o desactiva la manito en el cursor del mouse.
                    </p>
                  </div>
                  <button
                    @click="toggleCursor()"
                    class="flex focus:border-primary ring-foreground items-center justify-center border border-secondary bg-background shrink-0 hover:bg-secondary/80 size-8"
                  >
                    <Pointer
                      v-if="cursorPointer"
                      class="size-4"
                    />
                    <MousePointer
                      v-else
                      class="size-4"
                    />
                  </button>
                </div>
                <div class="relative flex flex-row items-start justify-between p-3 border border-secondary">
                  <div class="space-y-0.5">
                    <label class="text-sm font-medium "> Modo
                      de color </label>
                    <p class="text-xs text-muted-foreground">
                      Alterná entre modo oscuro/claro/sistema, tambien podes elegir un color primario.
                    </p>
                  </div>
                  <ToggleTheme />
                </div>

                <div class="flex flex-row items-start justify-between gap-3 pt-2 p-3 border border-secondary">
                  <div class="space-y-0.5">
                    <label class="text-sm font-medium ">
                      Exportar al iniciar.</label>
                    <p class="text-xs text-muted-foreground">
                      Cuando la opcion está activada opción aparecerá la posibilidad de exportar la DB al iniciar la aplicación.
                    </p>
                  </div>
                  <button
                    @click="settings.toggle_save_on_load()"
                    class="flex focus:border-primary ring-foreground items-center justify-center border border-secondary bg-background shrink-0 hover:bg-secondary/80 size-8"
                    :class="settings.save_on_load ? 'hover:!bg-primary bg-primary hover:text-primary-foreground text-primary-foreground' : 'text-muted-foreground'"
                  >
                    <DatabaseZap class="size-5" />
                  </button>
                </div>

                <div class="flex flex-row items-start justify-between gap-3 pt-2 p-3 border border-secondary">
                  <div class="space-y-0.5">
                    <label class="text-sm font-medium ">Iniciar DB</label>
                    <p class="text-xs text-muted-foreground">
                      Cuando la opción está activada la base se inicia con un documento de ejemplo
                    </p>
                  </div>
                  <button
                    @click="settings.toggle_init_empty()"
                    class="flex focus:border-primary ring-foreground items-center justify-center border border-secondary bg-background shrink-0 hover:bg-secondary/80 size-8"
                    :class="settings.init_empty ? 'hover:!bg-primary bg-primary hover:text-primary-foreground text-primary-foreground' : 'text-muted-foreground'"
                  >
                    <BookOpenCheck
                      v-if="settings.init_empty"
                      class="size-5"
                    />
                    <BookOpen
                      v-else
                      class="size-5"
                    />
                  </button>
                </div>

              
                <h4 class="mt-2 mb-0 text-xs text-red-600">
                  Atención!
                </h4>
                <div class="flex flex-row items-center justify-between gap-3 p-3 border border-destructive">
                  <label
                    class="text-sm font-medium text-muted-foreground"
                  >
                    Eliminar la base de datos </label>
                  <DialogDeleteDB />
                </div>
              </div>
            </article>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar
            class="flex select-none touch-none p-0.5 bg-secondary transition-colors duration-[160ms] ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollAreaThumb
              class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
            />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>
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
