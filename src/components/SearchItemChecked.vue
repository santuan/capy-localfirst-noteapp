<script setup>
import {
  CircleOff,
} from "lucide-vue-next";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import Tooltip from "./ui/Tooltip.vue";

const counter = useCounterStore();
const { loaded_id } =   storeToRefs(counter);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

function toggleCheck(item, isChecked) {
  counter.change_project_checked(item, isChecked);
}

</script>

<template>
  <div class="z-20 flex items-center justify-between w-full pr-3 duration-300 h-7 md:pr-2 opacity-70">
    <span
      class="flex py-0.5 ml-1 rounded-full w-full items-center outline-none justify-start gap-2 text-sm text-left focus-within:ring-1 ring-primary"
      :class="loaded_id === props.data?.id ? 'text-primary' : ''"
    >
      <p
        class="@sm:max-w-full max-w-80 py-1  md:py-0 line-clamp-1 line-through decoration-wavy decoration-primary/50 text-foreground/50 decoration-1"
      >
        {{ props.data?.project_data.name }}
      </p>
    </span>
    <input
      type="checkbox"
      :id="'todook-' + props.data?.id"
      :checked="props.data?.project_data.checked"
      class="w-0 opacity-0 peer"
      required=""
      @change="toggleCheck(props.data, $event.target.checked)"
    >
    <Tooltip name="Desmarcar">
      <label
        :for="'todook-' + props.data?.id"
        class="flex items-center justify-center rounded-full relative z-[50] mr-0.5 peer-focus:ring-1 peer-focus:ring-primary size-7 md:size-6 shrink-0 peer-checked:border-blue-600 hover:text-primary peer-checked:text-primary hover:bg-secondary/20"
      >
        <CircleOff class="size-5 md:size-4" />
      </label>
    </Tooltip>
  </div>
</template>
