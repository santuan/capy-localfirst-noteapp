<script setup>
import { useColorMode, useStorage, useFavicon, useDark } from "@vueuse/core";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "radix-vue";
import { SunMedium, Moon } from "lucide-vue-next";
import Tooltip from "@/components/ui/Tooltip.vue";
import { computed, onMounted } from "vue";
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();

const mode = useColorMode();

const colorTheme = useStorage("theme", "theme-blue");
const isDark = useDark()

const favicon = computed(() => {
  const theme = colorTheme.value.replace("theme-", ""); 
  return isDark.value ? `${theme}-dark.png` : `${theme}-light.png`;
});

useFavicon(favicon, {
  baseUrl: '/',
  rel: 'icon',
})

const toggleColorTheme = (theme) => {
  document.body.classList.remove(colorTheme.value);
  document.body.classList.add(theme);
  colorTheme.value = theme;
};

onMounted(() => {
  toggleColorTheme(colorTheme.value);
});
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger class="interactive">
      <Tooltip
        name="Modo de color"
        :side="counter.showProjects ? 'bottom' : 'right'"
      >
        <span
          class="flex items-center justify-center border hover:bg-secondary/80 border-secondary bg-background size-8"
        >
          <Moon
            class="transition-all duration-300 scale-100 rotate-0 size-4 dark:-rotate-90 dark:scale-0"
          />
          <SunMedium
            class="absolute transition-all duration-300 scale-0 rotate-90 size-4 dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Modo de color</span>
        </span>
      </Tooltip>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      :align="counter.showProjects ? 'end' : 'center'"
      :side="counter.showProjects ? 'bottom' : 'right'"
      class="z-10 grid w-40 text-xs bg-secondary"
    >
      <DropdownMenuGroup>
        <DropdownMenuItem
          @click="mode = 'light'"
          class="p-2 hover:bg-secondary-foreground/10"
        >
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="mode = 'dark'"
          class="p-2 hover:bg-secondary-foreground/10"
        >
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="mode = 'auto'"
          class="p-2 hover:bg-secondary-foreground/10"
        >
          Sistema
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuGroup class="flex justify-between w-full p-3 bg-secondary">
        <DropdownMenuItem
          @click="toggleColorTheme('theme-rose')"
          class="rounded-full outline-none size-4 bg-rose-600 hover:ring-2 focus-visible:ring-2 ring-rose-500/50 ring-offset-1 "
          :class="colorTheme === 'theme-rose' ? ' !ring-primary/50 ring-4 !ring-offset-1': ''"
        />
        <DropdownMenuItem
          @click="toggleColorTheme('theme-blue')"
          class="bg-blue-600 rounded-full outline-none size-4 hover:ring-2 focus-visible:ring-2 ring-blue-500/50 ring-offset-1 "
          :class="colorTheme === 'theme-blue' ? ' !ring-primary/50 ring-4 !ring-offset-1': ''"
        />
        <DropdownMenuItem
          @click="toggleColorTheme('theme-green')"
          class="bg-green-600 rounded-full outline-none size-4 hover:ring-2 focus-visible:ring-2 ring-green-500/50 ring-offset-1 "
          :class="colorTheme === 'theme-green' ? ' !ring-primary/50 ring-4 !ring-offset-1': ''"
        />
        <DropdownMenuItem
          @click="toggleColorTheme('theme-yellow')"
          class="bg-yellow-600 rounded-full outline-none size-4 hover:ring-2 focus-visible:ring-2 ring-yellow-500/50 ring-offset-1 "
          :class="colorTheme === 'theme-yellow' ? ' !ring-primary/50 ring-4 !ring-offset-1': ''"
        />
        <DropdownMenuItem
          @click="toggleColorTheme('theme-violet')"
          class="rounded-full outline-none size-4 bg-violet-600 hover:ring-2 focus-visible:ring-2 ring-violet-500/50 ring-offset-1 "
          :class="colorTheme === 'theme-violet' ? ' !ring-primary/50 ring-4 !ring-offset-1': ''"
        />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
