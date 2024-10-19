<script setup>
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "radix-vue";

const props = defineProps({
  name: {
    type: String,
    default: "",
    required: false,
  },
  shortcut: {
    type: String,
    default: "",
    required: false,
  },
  side: {
    type: String,
    default: "right",
    required: false,
  },
  align: {
    type: String,
    default: "center",
    required: false,
  },
});
</script>

<template>
  <TooltipProvider>
    <TooltipRoot
      :delay-duration="400"
      ignore-non-keyboard-focus
    >
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side="props.side"
          class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade ring-primary ring-1 select-none max-w-80 bg-secondary px-2.5 py-1.5 flex gap-2 items-center justify-center"
          :class="props.shortcut ? 'flex-col' : ' '"
          :side-offset="6"
          :align="props.align"
          style="-webkit-font-smoothing: subpixel-antialiased;"
        >
          <span
            v-show="props.name"
            class="font-mono text-xs font-medium text-secondary-foreground"
          >{{ props.name }}</span>
          <kbd
            v-show="props.shortcut"
            class="pointer-events-none uppercase inline-flex h-5 select-none items-center gap-1 rounded bg-primary/20 px-1.5 font-mono text-[10px] text-secondary-foreground font-extrabold opacity-100"
          >
            {{ props.shortcut }}
          </kbd>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
