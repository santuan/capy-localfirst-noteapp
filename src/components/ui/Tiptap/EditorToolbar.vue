<script setup>
import {
  Italic,
  ImagePlus,
  SquarePilcrow,
  Bold,
  Strikethrough,
  Code,
  RemoveFormatting,
  Eraser,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Unlink2,
  Video,
  ChevronDown,
  ImageDown,
  Globe,
} from "lucide-vue-next";
import {
  DropdownMenuArrow,
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "radix-vue";


import { useStorage } from "@vueuse/core";
import Tooltip from "@/components/ui/Tooltip.vue";

import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();
import "medium-zoom/dist/style.css";
const { editor } = storeToRefs(counter);
const showEditorToolbar = useStorage("editorToolbar", true);

function addImage() {
  const url = window.prompt("Ingresar URL de la imagen");
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
}

function addImageBase64(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result;
      editor.value.chain().focus().setImage({ src: dataURL }).run();
    };
    reader.readAsDataURL(file);
  }
}

function addVideo() {
  const url = prompt("Ingresar URL del video de Youtube");
  editor.value.commands.setYoutubeVideo({
    src: url,
    width: Math.max(320, parseInt(640, 10)) || 640,
    height: Math.max(180, parseInt(480, 10)) || 480,
  });
}

function setLink() {
  const previousUrl = editor.value.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);
  if (url === null) {
    return;
  }
  if (url === "") {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }
  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
}


</script>


<template>
  <div class="flex justify-start mt-0.5 mb-2 button-group md:w-auto">
    <Tooltip
      name="Deshacer"
      side="bottom"
    >
      <button
        class="flex items-center justify-center border outline-none size-8 focus-visible:border-primary border-secondary"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <Undo2 class="size-4" />
      </button>
    </Tooltip>
    <Tooltip
      name="rehacer"
      side="bottom"
    >
      <button
        class="flex items-center justify-center border outline-none size-8 focus-visible:border-primary border-secondary"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        <Redo2 class="size-4" />
      </button>
    </Tooltip>

    <DropdownMenuRoot>
      <DropdownMenuTrigger class="data-[state=open]:!bg-primary data-[state=open]:text-primary-foreground relative">
        <Tooltip
          name="Agregar imagen"
          :side="'bottom'"
        >
          <span
            class="flex items-center justify-center outline-none interactive size-8 focus-visible:border-primary border-secondary"
          >
            <ImagePlus class="size-4" />
          </span>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        :side="'bottom'"
        :align="'start'"
        class="z-50 grid w-32 text-xs gap-1 bg-background border-2 border-primary"
      >
        <DropdownMenuItem
          as-child
          class="relative flex items-center justify-start  gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary hover:bg-secondary-foreground/10"
        >
          <label
            class="flex justify-start gap-2 p-2 hover:bg-primary"
            for="img-uploader"
            id="uploader"
          >
            <ImagePlus class="size-4" />
            <span>Base64</span>
            <input
              id="img-uploader"
              type="file"
              accept="image/jpeg"
              class="absolute inset-0 opacity-0"
              @change="addImageBase64"
            >
          </label>
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="addImage"
          class="flex items-center justify-start  gap-2 p-2 bg-background outline-none focus-visible:bg-primary hover:bg-secondary-foreground/10"
        >
          <ImageDown class="size-4" />
          Url
        </DropdownMenuItem>
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenuRoot>
    <Tooltip
      name="Agregar video Youtube"
      side="bottom"
      :align="'end'"
    >
      <button
        @click="addVideo"
        class="flex items-center justify-center outline-none interactive size-8 focus-visible:border-primary border-secondary"
      >
        <Video class="size-4" />
      </button>
    </Tooltip>


    <template v-if="showEditorToolbar">
      <DropdownMenuRoot>
        <DropdownMenuTrigger class="headingSelector">
          <template v-if="editor.isActive('heading', { level: 1 })">
            Título nivel 1
          </template>
          <template v-else-if="editor.isActive('heading', { level: 2 })">
            Título nivel 2
          </template>
          <template v-else-if="editor.isActive('heading', { level: 3 })">
            Título nivel 3
          </template>
          <template v-else-if="editor.isActive('heading', { level: 4 })">
            Título nivel 4
          </template>
          <template v-else-if="editor.isActive('heading', { level: 5 })">
            Título nivel 5
          </template>
          <template v-else-if="editor.isActive('heading', { level: 6 })">
            Título nivel 6
          </template>
          <template v-else-if="editor.isActive('bulletList')">
            Lista desordenada
          </template>
          <template v-else-if="editor.isActive('orderedList')">
            Lista ordenada
          </template>
          <template v-else>
            Párrafo
          </template>
          <span class="sr-only">Alineación de texto</span>
          <ChevronDown class="size-4 shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="bottom"
          class="z-10 grid text-xs border w-44 bg-background border-secondary"
        >
          <DropdownMenuItem
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Párrafo
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Titulo 1
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Titulo 2
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Titulo 3
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Titulo 4
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Titulo 5
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Titulo 6
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Lista desordenada
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            Lista ordenada
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
      <Tooltip
        name="Negrita"
        shortcut="Ctrl B"
        side="bottom"
      >
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          class="interactive"
        >
          <Bold />
        </button>
      </Tooltip>
      <Tooltip
        name="Cursiva"
        shortcut="Ctrl I"
        side="bottom"
      >
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          class="interactive"
        >
          <Italic />
        </button>
      </Tooltip>
      <Tooltip
        name="Linea de tachado"
        side="bottom"
        shortcut="Ctrl Shift S"
      >
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          class="interactive"
        >
          <Strikethrough />
        </button>
      </Tooltip>
      <Tooltip
        name="Codigo en linea"
        side="bottom"
        shortcut="Ctrl E"
      >
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          class="font-mono interactive !text-base"
        >
          <span class="flex items-center justify-center text-xs rounded size-5 bg-secondary-foreground/10 text-foreground">
            A
          </span>
        </button>
      </Tooltip>
      <Tooltip
        name="Bloque de Código"
        side="bottom"
        shortcut="Ctrl Alt C"
      >
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          class="interactive"
        >
          <Code />
        </button>
      </Tooltip>

      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Tooltip
            name="Alineación de texto"
            side="bottom"
          >
            <button class="flex items-center justify-center w-full bg-secondary interactive">
              <template v-if="editor.isActive({ textAlign: 'center' })">
                <AlignCenter class="size-6" />
              </template>
              <template v-else-if="editor.isActive({ textAlign: 'right' })">
                <AlignRight class="size-6" />
              </template>
              <template v-else-if="editor.isActive({ textAlign: 'justify' })">
                <AlignJustify class="size-6" />
              </template>
              <template v-else>
                <AlignLeft class="size-6" />
              </template>
              <span class="sr-only">Alineación de texto</span>
            </button>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="bottom"
          class="z-50 grid w-64 text-xs bg-secondary"
        >
          <DropdownMenuItem
            @click="editor.chain().focus().setTextAlign('left').run()"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          >
            <div class="flex items-center justify-start gap-3 p-1">
              <AlignLeft class="size-4" />
              <span>Izquierda</span>
            </div>
            <kbd
              class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100"
            >
              Ctrl Shift L
            </kbd>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().setTextAlign('center').run()"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          >
            <div class="flex items-center justify-start gap-3 p-1">
              <AlignCenter class="size-4" />
              <span>Centro</span>
            </div>
            <kbd
              class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100"
            >
              Ctrl Shift E
            </kbd>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().setTextAlign('right').run()"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          >
            <div class="flex items-center justify-start gap-3 p-1">
              <AlignRight class="size-4" />
              <span>Derecha</span>
            </div>
            <kbd
              class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100"
            >
              Ctrl Shift R
            </kbd>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().setTextAlign('justify').run()"
            class="flex items-center justify-between gap-2 p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
            :class="{
              'is-active': editor.isActive({ textAlign: 'justify' }),
            }"
          >
            <div class="flex items-center justify-start gap-3 p-1">
              <AlignJustify class="size-4" />
              <span>Justificado</span>
            </div>
            <kbd
              class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100"
            >
              Ctrl Shift J
            </kbd>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor.chain().focus().unsetTextAlign().run()"
            class="flex items-center justify-between p-2 pr-3 cursor-pointer hover:bg-secondary-foreground/10"
          >
            <span>Sin alineación</span>
            <kbd
              class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium ml-auto text-muted-foreground opacity-100"
            >
              Ctrl Shift L
            </kbd>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
      <Tooltip
        name="Lista desordenada"
        side="bottom"
        shortcut="Ctrl Shift 8"
      >
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="interactive"
        >
          <List />
        </button>
      </Tooltip>
      <Tooltip
        name="Lista ordenada"
        side="bottom"
        shortcut="Ctrl Shift 7"
      >
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          class="interactive"
        >
          <ListOrdered />
        </button>
      </Tooltip>

      <Tooltip
        name="Cita"
        side="bottom"
        shortcut="Ctrl Shift B"
      >
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          class="interactive"
        >
          <Quote />
        </button>
      </Tooltip>
      <Tooltip
        name="Separador"
        side="bottom"
      >
        <button
          @click="editor.chain().focus().setHorizontalRule().run()"
          class="interactive"
        >
          <Minus />
        </button>
      </Tooltip>
      <Tooltip
        name="Añadir link"
        side="bottom"
      >
        <button
          @click="setLink"
          :class="{ 'is-active': editor.isActive('link') }"
          class="interactive"
        >
          <Link2 class="-rotate-45" />
        </button>
      </Tooltip>
      <Tooltip
        name="Eliminar link"
        side="bottom"
      >
        <button
          @click="editor.chain().focus().unsetLink().run()"
          :disabled="!editor.isActive('link')"
          class="interactive"
        >
          <Unlink2 class="-rotate-45" />
        </button>
      </Tooltip>
      <Tooltip
        name="Quitar estilos de linea"
        side="bottom"
        shortcut="Negrita - Italica - Link"
      >
        <button
          @click="editor.chain().focus().unsetAllMarks().run()"
          class="interactive"
        >
          <RemoveFormatting />
        </button>
      </Tooltip>
      <Tooltip
        name="Quitar estilos de bloque"
        side="bottom"
        shortcut="Títulos - Listas - Código en bloque - Cita"
      >
        <button
          @click="editor.chain().focus().clearNodes().run()"
          class="interactive"
        >
          <Eraser />
        </button>
      </Tooltip>
    </template>
  </div>
</template>



<style scoped>
.button-group {
  @apply bg-background flex flex-wrap w-full;
}

.headingSelector {
  /* grid-column: 1 / 8; */
  @apply flex items-center !text-xs !justify-between bg-background px-2;
  @apply !min-w-40 !max-w-40 w-full hover:z-10;
}

.button-group button {
  @apply border border-secondary focus-within:border-primary outline-none h-8 min-w-8 max-w-8 xl:max-w-14 text-sm focus-visible:border-primary hover:!border-primary flex justify-center items-center duration-100;
  flex: 1;
}

.control-group button {
  @apply disabled:text-foreground/30 disabled:pointer-events-none;
}

.button-group button.is-active {
  @apply bg-primary text-primary-foreground;
}

.button-group button svg {
  @apply size-3.5;
}


body:has(.cursorPointer) label {
  cursor: pointer;
}


</style>
