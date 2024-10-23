<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue";
import { toast } from 'vue-sonner'
import { watch } from 'vue';

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

watch(offlineReady, (value) => {
  if (value) {
    toast.success('Aplicación lista para trabajar sin conexión', {
      duration: 4000,
    });
    offlineReady.value = false;
  }
});

watch(needRefresh, (value) => {
  if (value) {
    console.log('Nueva versión disponible')
    toast.info('Nueva versión disponible', {
      description: 'Click en actualizar',
      duration: Infinity,
      action: {
        label: 'Actualizar',
        onClick: () => updateServiceWorker(),
      },
    });
  }
});
</script>

<template>
  <div />
  <!-- Empty template since we're using programmatic toasts -->
</template>