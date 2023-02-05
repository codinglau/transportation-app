<template>
  <q-item clickable class="text-weight-bold">
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
defineProps({
  route: {
    type: Object,
    required: true,
  },
});
</script>