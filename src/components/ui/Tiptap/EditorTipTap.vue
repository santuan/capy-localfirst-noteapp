<script setup>

import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "radix-vue";

import { onMounted, onBeforeUnmount, ref } from "vue";
import { useStorage } from "@vueuse/core";
import { Editor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-3";
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

import EditorToolbar from "@/components/ui/Tiptap/EditorToolbar.vue";
import EditorCodeBlock from "@/components/ui/Tiptap/EditorCodeBlock.vue";
import mediumZoom from "medium-zoom/dist/pure";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Youtube from "@tiptap/extension-youtube";
import Video from "./addVideo";
import CodeBlockShiki from "tiptap-extension-code-block-shiki";

import "medium-zoom/dist/style.css";

const showEditorToolbar = useStorage("editorToolbar", true);
const counter = useCounterStore();
const { editor } = storeToRefs(counter);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  toolbar: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "max-w-5xl w-full mx-auto my-6",
          "data-zoomable": "",
        },
      }),
      Video,
      Typography,
      Link.configure({
        openOnClick: true,
        defaultProtocol: "https",
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener",
          class:
            "px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Escribir algo …",
      }),
      Youtube.configure({
        controls: true,
        ccLanguage: "es",
        nocookie: true,
      }),
      CodeBlockShiki.extend({
        addNodeView() {
          return VueNodeViewRenderer(EditorCodeBlock);
        },
      }).configure({
        HTMLAttributes: {
          spellcheck: "false",
        },
        defaultTheme: "houston",
      }),
    ],
    content: props.modelValue,
    editable: props.editable,
    onCreate: () => {
      if (!props.editable) {
        mediumZoom("[data-zoomable]", {
          margin: 12,
          background: "hsl(var(--background))",
          scrollOffset: 0,
        });
      }
    },
    onUpdate: () => {
      if (!props.editable) {
        mediumZoom("[data-zoomable]", {
          margin: 12,
          background: "hsl(var(--background))",
          scrollOffset: 0,
        });
      }
      emit("update:modelValue", editor.value.getHTML());
    },
  });
});

onBeforeUnmount(() => {
  editor.value.destroy();
});

</script>

<template>
  <div
    v-if="editor"
    class="grid EditorCK w-full px-2 md:pr-2"
  >
    <div
      v-if="toolbar"
      class="sticky top-0 z-30 pt-0.5 bg-background"
    >
      <div class="relative grid w-full max-w-full gap-1 mx-auto control-group">
        <!-- Inicio Slot: Muestra o el titulo o un input -->
        <slot />
        <!-- fin slot -->
        <EditorToolbar />
      </div>
    </div>
    
    <ScrollAreaRoot
      class="w-full border  border-secondary "
      :class="[
        showEditorToolbar ? 'h-[calc(100vh-5.375rem)]' : 'h-[calc(100vh-2.75rem)]',
        !toolbar ? 'border-transparent !h-screen' : '',
        editable ? 'bg-secondary/30' : 'bg-background',
      ]"
      style="--scrollbar-size: 10px"
    >
      <ScrollAreaViewport class="w-full h-full">
        <div
          class="max-w-full mx-auto prose  dark:prose-invert"
          spellcheck="false"
        >
          <div
            v-if="!toolbar"
            class="flex items-center justify-start px-4 pt-3"
          >
            <slot />
          </div>
          <editor-content :editor="editor" />
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
    </ScrollAreaRoot>
  </div>
</template>

<style>
.tiptap {
  @apply p-4 outline-none placeholder:text-primary min-h-64 font-serif;
}

.tiptap h1:first-of-type,
.tiptap h2:first-of-type,
.tiptap h3:first-of-type,
.tiptap h4:first-of-type,
.tiptap h5:first-of-type,
.tiptap h6:first-of-type {
  @apply mt-4;
}

.tiptap p a span {
  @apply !text-inherit;
}

.tiptap p {
  @apply break-words;
  hyphens: auto;
}

.tiptap p:has(img) {
  margin: 0;
}

.tiptap p:has(img) img {
  margin: 0;
}

.tiptap img {
  @apply mr-auto;
}

.tiptap p a {
  @apply break-all underline-offset-4 decoration-dotted underline;
}

.tiptap pre {
  @apply my-0;
}

.tiptap p code {
  @apply bg-primary/20 break-all px-1 mx-0.5 rounded py-0.5 text-foreground ring-1 ring-primary/30 font-light text-sm;
}




.medium-zoom--opened .medium-zoom-overlay {
  z-index: 99;
}

.medium-zoom-image--opened {
  z-index: 100;
  margin: 0;
}

.medium-zoom-image {
  transition: transform 0.6s cubic-bezier(0.2, 0, 0.2, 1) !important;
}

.tiptap code::after,
.tiptap code::before {
  display: none;
}

html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  /* Optional, if you also want font styles */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
  @apply text-foreground/30;
}

/* Bubble menu */
.bubble-menu {
  @apply bg-secondary border border-secondary p-1 flex text-xs gap-2 items-center;
}

.bubble-menu button {
  background-color: unset;
  @apply h-8 px-2;
}

.bubble-menu button:hover {
  @apply bg-background;
}

.bubble-menu.is-active {
  background-color: var(--purple);
}

.bubble-menu.is-active:hover {
  background-color: var(--purple-contrast);
}

.tiptap iframe {
  @apply max-w-3xl mx-auto bg-primary/20 relative w-full h-96 aspect-video z-20;
}

/* 
.tiptap ::before {
  content: "";
  @apply absolute inset-0 bg-primary/10 mix-blend-multiply z-10 animate-pulse;
} */

.tiptap table {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.tiptap td,
.tiptap th {
  border: 1px solid var(--gray-3);
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

.tiptap th {
  background-color: var(--gray-1);
  font-weight: bold;
  text-align: left;
}

.tiptap .selectedCell:after {
  background: var(--gray-2);
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.tiptap .column-resize-handle {
  background-color: var(--purple);
  bottom: -2px;
  pointer-events: none;
  position: absolute;
  right: -2px;
  top: 0;
  width: 4px;
}

.tiptap .tableWrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
}

.tiptap.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

/* .tiptap img {
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
} */

.tiptap .ProseMirror-selectednode {
  /* outline: 3px solid #68cef8; */
  @apply ring-2 ring-primary;
}


.tiptap li p {
  @apply m-0;
}
</style>
