<template>
  <q-list separator>
    <q-slide-item 
        v-for="route in routes"
        :key="route.id">
      <RouteItem :route="route" />
    </q-slide-item>
  </q-list>
</template>

<script setup>
import RouteItem from './RouteItem.vue';

defineProps({
  routes: {
    type: Array,
    required: true,
  },
});
</script>
