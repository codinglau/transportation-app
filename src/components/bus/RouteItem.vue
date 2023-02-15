<template>
  <q-item clickable class="text-weight-bold" :to="viewRoute">
    <q-item-section avatar>
      <q-btn unelevated round
          :label="route.id" 
          color="primary"
          text-color="white" />
    </q-item-section>
    <q-item-section class="text-center">
      <q-item-label>
        {{ route.origin }}
      </q-item-label>
      <q-item-label>
        <q-icon name="swap_vert" color="primary" />
      </q-item-label>
      <q-item-label>
        {{ route.destination }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed } from 'vue';

// define props
const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
});

const viewRoute = computed(() => {
  return {
    name: 'bus.route',
    params: {
      routeId: props.route.id,
      direction: 'inbound',
    },
  };
});
</script>