<script setup>
import { RouterView } from "vue-router";
import { useColorMode, useStorage } from "@vueuse/core";
import { Toaster } from 'vue-sonner'
import ToastOffline from "@/components/ui/ToastOffline.vue";
const mode = useColorMode();
const cursorPointer = useStorage("cursor", true);
</script>

<template>
  <div :class="cursorPointer ? 'cursorPointer' : 'cursorInitial'">
    <main class="AppContainer ">
      <RouterView />
    </main>
    <ToastOffline />
    <Toaster
      :theme="mode === 'light' ? 'light' : 'dark'"
      position="bottom-center"
    />
  </div>
</template>

<style scoped>

.AppContainer {
 @apply w-full min-h-screen font-mono bg-background text-foreground 
}

nav a.router-link-exact-active {
  @apply text-primary;
}
</style>


