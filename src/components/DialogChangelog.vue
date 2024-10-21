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
import { X } from "lucide-vue-next";

const lastVersion = "0.1.4"

const props = defineProps({
  button: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <DialogRoot>
    <DialogTrigger
      v-show="props.button"
      class="flex items-center justify-center bg-secondary hover:bg-secondary/80"
    >
      Ver registro cambios
    </DialogTrigger>
    <DialogTrigger
      v-show="!props.button"
      class="flex hover:underline decoration-wavy hover:decoration-primary"
    >
      <span class="hidden md:inline-flex "> Ver registro de cambios </span> 
      &nbsp;{{ lastVersion }} - Alpha
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-background/95 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-[9998]"
      />
      <DialogContent
        class="md:data-[state=open]:animate-contentShow font-mono fixed top-6 md:top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[750px] translate-x-[-50%] md:translate-y-[-50%] bg-background rounded p-4 focus:outline-none z-[9999]"
      >
        <DialogTitle class="text-foreground !select-text m-0 text-[17px] font-semibold">
          Registro de cambios
        </DialogTitle>
        <ScrollAreaRoot
          class="w-full border h-[78vh] mt-6 md:h-[70vh] border-secondary"
          style="--scrollbar-size: 10px"
        >
          <ScrollAreaViewport class="w-full h-full">
            <article
              class="max-w-full p-3 mx-auto prose dark:prose-invert"
            >
              <DialogDescription
                as="h4"
                class="mt-3 mb-5 leading-normal text-foreground !select-text"
              >
                {{ lastVersion }} - <small>Última version desplegada</small>
              </DialogDescription>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Refactor: Se agrega la posibilidad de limpiar la base de datos desde la configuración.</li>
                <li>Feature: Abrir modal de Exportar json al iniciar la app para rapido backup.</li>
                <li>Refactor: Cambios en el tour.</li>
                <li>Add: Plugin persisted data para Pinia (stores).</li>
                <li>Bump up: Tailwind, VueSooner.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.1.2
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Feature: Modal de configuraciones con Modo color, puntero, Tour.</li>
                <li>Feature: se agrega la opcion de activar el cursor con puntero o manito.</li>
                <li>Refactor: Cambios en el tour</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.1.1
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Feature: Cuando se arrastra algun elemento al sidebar se activa el modal de DialogImportDB.</li>
                <li>Refactor: Alto fijo SearchItem</li>
                <li>Refactor: Modificación del icono de fijado y desfijado</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.1.0
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Refactor: Rearmado de archivos y limpieza de código.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.21
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Refactor: Mejor interacción en mobile para el Sidebar.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.20
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Feature: se agrega un Tour la primera vez que ingresas.</li>
                <li>Refactor: Se modifica la posición y la jerarquia del boton Guardar documento.</li>
                <li>Refactor: Mas padding en mobile para el listado de documentos.</li>
                <li>Bump up dependencias</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.19
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Feature: Se agrega <code>async function change_project_fixed</code></li>
                <li>Feature: Se agregan al estado global los ref <code>project_checked</code> y <code>project_fixed</code></li>
                <li>Refactor: Se desactiva la posibilidad de ocultar barra de texto.</li>
                <li>Refactor: Se lleva el alto maximo del bloque de codigo a 600px.</li>
                <li>Refactor: Botones tienen el mismo hover que focus-within.</li>
                <li>Refactor: Nombre de la función <code>change_project_checked</code> reemplaza a <code>mark_project_checked</code>.</li>
                <li>Refactor: Solo se puede hacer zoom a la imagen en modo previsualización.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.18
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Refactor: El <code>shallowRef</code> del editor ahora se aloja en el store global.</li>
                <li>Refactor: se separa la toolbar a un componente aparte.</li>
                <li>Refactor: se modifican los iconos de previsualizar y editable.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.17
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Fix: dropdown en toolbar mal posicionada por el container querie</li>
                <li>Bump up dependencias</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.16
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Se prueban usar <code>shallowRef</code> en lugar de <code>ref</code></li>
                <li>Se agrega hasUnsavedChanges para chequear antes de cambiar de documento.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.15
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Add: Se agrega iframe al editor.</li>
                <li>Refactor: Cleanup code DialogProjectListSearch.</li>
                <li>Refactor: <code>ShikiCodeBlock</code> posicion del autocompletable y scroll arriba del sombreado</li>
                <li>Fix: forzar por defecto focus visible a botones</li>
                <li>Fix: Hover al tachito de eliminar</li>
                <li>Fix: Max width al tooltip</li>
                <li>Fix: Max width al sidebar</li>
                <li>Fix: Shortcut menu a <code>ctrl + m</code></li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.14
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Se revierte async editor.</li>
                <li>Mejor dialog para buscar con ctrl shift f.</li>
                <li>Editor por defecto en editable.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.13
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Se agrega modo para previsualizar y que no sea editable (excepto la seleccion de lenguaje de la terminal).</li>
                <li>Reordenado visual. Importar y exportar solo se muestran con el menú abierto.</li>
                <li>Busqueda de comando con <code>ctrl shift f</code> en modo previsualizar por ahora.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.12
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Se agrega dependencia medium-zoom.</li>
                <li>Se actualizan dependencias de Vue, Vite.</li>
                <li>Fix Dropdown quedaba por debajo de selector de lenguaje en el editor.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.11
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li><span class="bg-primary py-0.5 px-1 rounded-full text-xs ">Break</span> Se elimina null por defecto en loaded_id y reemplaza por "".</li>
                <li>Estilo por defecto del theme ahora es <code>theme-blue</code>.</li>
                <li>Se agrega Radix Select para ordenar items.</li>
                <li>Boton crear con mayor jerarquía.</li>
                <li>Mejores textos de placeholder.</li>
                <li>Pequeños ajustes visuales imperceptibles.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.10
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Se accede al changelog desde el dialog de más información.</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.9
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Ahora los Check y Uncheck son dos arrays distintos</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.8
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Fix poder marcar Check/Uncheck al item cuando hay scroll</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                0.0.7
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Se agrega la posibilidad de marcar un items como check.</li>
                <li>Se agrega ordenado de items por nombre o fecha</li>
              </ul>
              <h4 class="mt-3 mb-5 leading-normal text-foreground !select-text">
                Menor a 0.0.6
              </h4>
              <ul class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                <li>Initial commits.</li>
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
        <div class="flex justify-end mt-2 md:mt-3">
          <DialogClose as-child>
            <button
              class="bg-secondary text-foreground !select-text hover:bg-background hover:ring-2 hover:ring-foreground text-sm focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Cerrar ventana
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="absolute inline-flex items-center justify-center appearance-none top-4 text-foreground !select-text hover:bg-secondary/80 right-3 size-7 focus:shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:text-primary"
          aria-label="Close"
        >
          <X />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>


<style scoped>

code {
  @apply bg-primary/20 break-all px-1 mx-0.5 rounded py-0.5 text-foreground !select-text ring-1 ring-primary/30 font-light text-sm;
}

code::before,
code::after {
  content: ""
}

li {
  text-wrap: pretty;
  margin: 0.75rem 0;
}

</style>