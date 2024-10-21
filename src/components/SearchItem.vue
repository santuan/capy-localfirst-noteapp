<script setup>
import { ArrowRight, Circle, Pin, X } from "lucide-vue-next";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import Tooltip from "./ui/Tooltip.vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { ref } from "vue";
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

const counter = useCounterStore();
const { loaded_id } = storeToRefs(counter);
const breakpoints = useBreakpoints(breakpointsTailwind);
const largerThanLg = breakpoints.greater("lg");

const showAlertDialog = ref(false);
const selectedId = ref(null);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

function hasUnsavedChanges() {
  if (counter.project_body === "<p></p>") {
    return false;
  }
  return (
    loaded_id.value === "" && // Si no hay documento cargado
    counter.project_body !== "" // Si el nombre del proyecto está marcado como dirty
  );
}

function confirmSetDocument(id) {
  if (hasUnsavedChanges()) {
    selectedId.value = id;
    showAlertDialog.value = true;
  } else {
    set_document(id);
  }
}

function set_document(id) {
  if (largerThanLg.value === true) {
    counter.set_project(id);
  } else {
    counter.set_project(id);
    counter.showProjects = false;
  }
  showAlertDialog.value = false;
}

function toggleCheck(item, isChecked) {
  counter.change_project_checked(item, isChecked);
}

function toggleFixed(item, isFixed) {
  counter.change_project_fixed(item, isFixed);
}

</script>

<template>
  <div class="relative flex items-center justify-between w-full pr-3 h-7 md:pr-2 group">
    <Tooltip
      side="top"
      :name="props.data.project_data?.fixed ? 'Desfijar' : 'Fijar'"
    >
      <div class="flex items-center w-7 h-7">
        <ArrowRight
          class="mx-1 size-4 shrink-0 group-hover:hidden group-focus-visible:hidden group-focus-within:hidden"
          :class="props.data.project_data?.fixed ? '!hidden' : ''"
        />
        <button
          @click="toggleFixed(props.data, props.data.project_data?.fixed)"
          class="hidden py-1 mx-1 outline-none group-hover:inline-flex md:py-0 hover:text-primary group-focus-visible:!block focus-visible:ring-1 group-focus-within:!block"
          :class="props.data.project_data?.fixed ? '!block' : ''"
        >
          <Pin
            class="-rotate-45 size-4" 
            :class="props.data.project_data?.fixed ? 'fill-current text-primary' : ''"
          />
        </button>
      </div>
    </Tooltip>
    <button
      class="flex interactive hover:!text-primary px-2 py-0.5 rounded w-full items-center group-hover:text-foreground outline-none justify-start gap-2 text-sm text-left focus-within:ring-1 ring-primary"
      :class="loaded_id === props.data.id ? 'text-primary' : ''"
      @click="confirmSetDocument(props.data.id)"
    >
      <p class="@sm:max-w-full max-w-80 ">
        {{ props.data.project_data?.name.length > 25 ? props.data.project_data?.name.substring(0, 25) + '&hellip;' :
          props.data.project_data?.name }}
      </p>
    </button>
    <AlertDialogRoot v-model:open="showAlertDialog">
      <AlertDialogPortal>
        <AlertDialogOverlay class="fixed inset-0 z-[999] bg-black/50" />
        <AlertDialogContent class="md:data-[state=open]:animate-contentShow fixed z-[999] w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-background text-foreground border border-secondary font-mono">
          <AlertDialogTitle class="text-sm font-medium">
            Cambios sin guardar
          </AlertDialogTitle>
          <AlertDialogDescription class="mt-2 mb-5 text-xs">
            El documento actual tiene cambios sin guardar. ¿Quieres continuar y descartar los cambios?
          </AlertDialogDescription>
          <div class="flex justify-between gap-x-2">
            <AlertDialogAction as-child>
              <button
                @click="set_document(selectedId)"
                class="bg-red-600  text-white hover:bg-red-800  outline-none inline-flex ring-0  hover:ring-2 ring-red-600 h-[35px] items-center justify-center rounded-[4px] px-3 text-xs font-semibold leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Descartar cambios
              </button>
            </AlertDialogAction>
            <AlertDialogCancel as-child>
              <button class="bg-secondary ring-1 !ring-secondary text-foreground hover:bg-background hover:ring-2 hover:ring-foreground inline-flex h-[35px] items-center justify-center rounded-[4px] px-3 text-xs font-semibold leading-none focus-visible:ring-2 focus:outline-foreground">
                Continuar editando
              </button>
            </AlertDialogCancel>
          </div>
          <AlertDialogCancel class="absolute top-0 size-6 flex justify-center items-center m-3 right-0 z-[999] text-foreground">
            <X class="size-4" />
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
    <input
      type="checkbox"
      :id="'todo-' + props.data.id"
      :checked="props.data.project_data?.checked"
      class="w-0 opacity-0 peer"
      required=""
      @change="toggleCheck(props.data, $event.target.checked)"
    >
    <Tooltip
      side="top"
      align="end"
      name="Marcar como completo"
    >
      <label
        :for="'todo-' + props.data.id"
        class="flex items-center justify-center rounded-full relative z-[50] mr-0.5 peer-focus:ring-1 peer-focus:ring-primary size-7 md:size-6 shrink-0 peer-checked:border-blue-600 hover:text-primary peer-checked:text-primary hover:bg-secondary/20"
      >
        <Circle class="size-5 md:size-4" />
      </label>
    </Tooltip>
  </div>
</template>