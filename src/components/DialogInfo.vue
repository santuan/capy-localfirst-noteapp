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
import { CircleHelp, TentTree, X } from "lucide-vue-next";
import { useMagicKeys, whenever } from '@vueuse/core'

import Tooltip from "./ui/Tooltip.vue";
import DialogChangelog from "./DialogChangelog.vue";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";
const counter = useCounterStore();
const keys = useMagicKeys();
const magicAbout = keys["ctrl+alt+q"];
const open = ref(false)

whenever(magicAbout, (n) => {
  if (n)
    open.value = true
})
</script>

<template>
  <DialogRoot v-model:open="open">
    <Tooltip
      name="Acerca de esta app"
      :side="counter.showProjects ? 'bottom' : 'right'"
    >
      <DialogTrigger
        class="flex items-center justify-center border interactive border-secondary hover:bg-secondary/80 bg-background size-8"
      >
        <CircleHelp class="size-4" />
      </DialogTrigger>
    </Tooltip>
    <DialogPortal>
      <DialogOverlay
        class="bg-background/95 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-[60]"
      />
      <DialogContent
        class="md:data-[state=open]:animate-contentShow font-mono fixed top-6 md:top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[750px] translate-x-[-50%] md:translate-y-[-50%] bg-background rounded p-4 focus:outline-none z-[100] "
      >
        <DialogTitle class="text-foreground m-0 text-[17px] font-semibold">
          Acerca de esta app
        </DialogTitle>
        <ScrollAreaRoot
          class="w-full border h-[78vh] mt-6 md:h-[70vh] border-secondary select-interactive"
          style="--scrollbar-size: 10px"
        >
          <ScrollAreaViewport class="w-full h-full">
            <article
              class="max-w-full p-3 mx-auto prose dark:prose-invert"
            >
              <DialogDescription class="inline-block p-3 mt-3 mb-3 text-sm leading-normal rounded text-foreground bg-primary/20">
                Esto es una beta, no utilizar más que para realizar pruebas.
              </DialogDescription>
              <p class="mt-3 mb-5 text-sm leading-normal text-foreground !select-text">
                Esta aplicación usa la tecnologia 
                <a
                  href="https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API/Using_IndexedDB"
                  class="underline underline-offset-2"
                >IndexedDB</a>
                que existe dentro en los navegadores para almacenar datos. Estos datos
                quedan almacenados en la sesión de ese navegador (Al limpiar los datos
                del navegador estos se perderán).
              </p>
              <p class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text ">
                Puede exportar e importar la
                IndexedDB en formato JSON y asi mantener la base de datos localmente.
              </p>
              <p class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text ">
                Tambien se utiliza localStorage para persistir:
              </p>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text  ">
                <li>El modo de color seleccionado.</li>
                <li>Visibilidad de las opciones para formatear el texto.</li>
                <li>Ancho del editor</li>
              </ul>
              <h4>Funcionalidades</h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text  ">
                <li>Se puede asignar un nombre a la base de datos.</li>
                <li>Crear elementos con texto enriquecido.</li>
                <li>Agrega bloques de código con resaltado de sintaxis.</li>
                <li>Pegar directamente videos de youtube.</li>
                <li>Imágenes</li>
                <ul class="pl-0 mb-5 ml-5 text-sm leading-normal text-foreground !select-text ">
                  <li>via URL</li>
                  <li>guardadas en la DB como Base64</li>
                </ul>
              </ul>
              <h4>Tecnologías utilizadas</h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text  ">
                <li>Dexie - Wrapper de IndexedDB</li>
                <li>
                  Vue.js
                </li>
                <li> Tailwindcss</li>
                <li> @radix-vue<br>Componentes accesibles para construir sistemas de diseño y aplicaciones web.</li>
                <li>
                  TipTap<br>The headless
                  rich text editor
                </li>
                <li>
                  RxJS (Reactive Extensions for modern JavaScript)<br>Programación reactiva utilizando Observables. 
                </li>
                <li> @VueUse/rxjs<br>Este es un complemento de VueUse, que permite utilizar RxJS de una manera natural.</li>
                <li> MediumZoom</li>
              </ul>
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
        <div class="flex justify-between mt-2 md:mt-3">
          <div
            class="flex items-center justify-start gap-2 font-mono text-xs font-semibold text-foreground"
          >
            <TentTree class="size-5 text-primary" />
            <DialogChangelog />
          </div>
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
