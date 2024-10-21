<script setup>
import { useCounterStore } from "@/stores/counter";
import Editor from "@/components/ui/Tiptap/EditorTipTap.vue";

const counter = useCounterStore();
</script>

<template>
  <div
    :key="counter.loaded_id"
    class="relative h-full mx-auto ring-1 lg:w-full ring-secondary"
  >
    <Editor
      v-if="counter.content_editable"
      v-model="counter.project_body"
      toolbar
      editable
    >
      <div class="flex flex-col items-start justify-between w-full gap-1 my-0.5">
        <textarea
          placeholder="Item sin título"
          autocomplete="off"
          spellcheck="false"
          v-model="counter.project_name"
          style="field-sizing: content"
          class="w-full px-2 py-0.5 overflow-visible border outline-none resize-none min-h-8 create_project bg-secondary/30 text-foreground border-secondary focus-within:border-primary placeholder:text-foreground/50 hover:border-primary"
        />
      </div>
    </Editor>
    <Editor
      class="preview-editor"
      v-else
      v-model="counter.project_body"
    >
      <div class="grid">
        <div v-if="counter.loaded_id === ''">
          Seleccione un item para visualizar
        </div>
        <h1 class="pt-6 mb-0 font-serif text-4xl/relax text-foreground text-balance">
          {{ counter.project_name }}
        </h1>
      </div>
    </Editor>
    <button
      v-show="!counter.loaded_id"
      @click="counter.create_project()"
      :disabled="counter.project_name === ''"
      :class="counter.project_name
        ? 'bg-primary text-primary-foreground hover:bg-primary/80'
        : 'disabled bg-secondary  pointer-events-none'
      "
      class="absolute bottom-0 right-0 z-20 h-8 px-3 text-xs md:-translate-y-5 -left-8 md:left-6 md:right-6 GuardarDocumento disabled:text-foreground/50"
    >
      Guardar documento
    </button>
  </div>
</template>
