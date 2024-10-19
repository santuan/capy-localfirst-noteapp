<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue";
import { SquareArrowOutUpRight } from "lucide-vue-next";
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

async function close() {
  offlineReady.value = false;
  needRefresh.value = false;
}

</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="pwa-toast"
    role="alert"
  >
    <div class="message">
      <span v-if="offlineReady">
        Aplicación lista para trabajar sin conexión
      </span>
      <div
        v-else
        class="grid gap-3 mb-3"
      >
        <h4 class="font-bold">
          Hay una nueva versión disponible.
        </h4>
        <p>
          Click en recargar para actualizar la app o click en cerrar para dejarla pendiente.
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <button
        v-if="needRefresh"
        @click="updateServiceWorker()"
      >
        Recargar
      </button>
      <button @click="close">
        Cerrar
      </button>
    </div>
  </div>
</template>

<style>
.pwa-toast {
  @apply bg-secondary font-mono border border-background text-foreground fixed right-0 bottom-11 m-3 p-3 z-[9996] text-left;
}

.pwa-toast .message {
  margin-bottom: 8px;
  @apply text-xs w-64;
}

.pwa-toast button,
.pwa-toast a {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
  @apply text-xs font-mono text-center;
}
</style>