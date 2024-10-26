<script setup>
import { shallowRef } from "vue";
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "radix-vue";
import { ArrowRightToLine } from "lucide-vue-next";
import Tooltip from "@/components/ui/Tooltip.vue";
import { useKeyModifier, useMagicKeys, whenever } from '@vueuse/core'
import { useCounterStore } from "@/stores/counter";
const panelRef = shallowRef()
const layout = shallowRef(0)
const keys = useMagicKeys();

const ExpandAll = useKeyModifier('Control', { events: ['mouseup', 'mousedown'] })
const counter = useCounterStore();
const magicExpandDocument = keys["ctrl+alt-ArrowRight"];
const magicCollapseDocument = keys["ctrl+alt-ArrowLeft"];


whenever(magicExpandDocument, (n) => {
  if (n) expandAllScreen()
})

whenever(magicCollapseDocument, (n) => {
  if (n) collapseAllScreen()
})

function expandAllScreen() {
  if (panelRef.value.isCollapsed) {
    panelRef.value.expand()
  } else {
    panelRef.value.collapse()
  }
  if (ExpandAll.value === true) {
    counter.showProjects = !counter.showProjects
  }
}

function collapseAllScreen() {
  if (panelRef.value.isCollapsed) {
    panelRef.value.expand()
  } else {
    panelRef.value.collapse()
  }
  if (ExpandAll.value === true) {
    counter.showProjects = !counter.showProjects
  }
}

</script>

<template>
  <SplitterGroup
    direction="horizontal"
    auto-save-id="splitter"
    @layout="layout = $event"
  >
    <div
      :style="`flex: ${layout[1]} 1 0px; overflow: hidden;`"
      class="hidden lg:flex"
    />
    <SplitterPanel :min-size="80">
      <slot />
    </SplitterPanel>
    <SplitterResizeHandle
      class="hidden lg:flex group justify-center items-center w-8 border-l-2 border-secondary/10 data-[state=hover]:border-primary/90  data-[state=drag]:border-primary/90 data-[state=hover]:delay-700 data-[state=hover]:border-l-4 duration-300"
    >
      <Tooltip
        :name="panelRef?.isCollapsed ? 'Colapsar' : 'Expandir'"
        :side="panelRef?.isCollapsed ? 'left' : 'right'"
        :shortcut="panelRef?.isCollapsed ? 'Presionar ctrl para colapsar el menú' : 'Presionar ctrl para expandir el menú'"
      >
        <button
          class="z-20 flex items-center justify-center bg-background size-6"
          @click="expandAllScreen"
          @keyup.enter="panelRef?.isCollapsed ? panelRef?.expand() : panelRef?.collapse()"
          :class="panelRef?.isCollapsed ? 'rotate-180' : ''"
        >
          <ArrowRightToLine class="delay-75 size-4 opacity-90" />
        </button>
      </Tooltip>
    </SplitterResizeHandle>
    <SplitterPanel
      :max-size="20"
      :collapsed-size="0"
      ref="panelRef"
      collapsible
      @resize="resize = $event"
      class="hidden lg:flex"
    />
  </SplitterGroup>
</template>
