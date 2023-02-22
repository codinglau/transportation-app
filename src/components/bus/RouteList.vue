<template>
  <q-list separator>
    <q-slide-item 
        v-for="route in routes"
        :key="route.id">
      <q-item clickable 
          active-class="bg-teal-1"
          :to="viewBusRoute(route.id)">
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
    </q-slide-item>
  </q-list>
</template>

<script setup>
const props = defineProps({
  routes: {
    type: Array,
    required: true,
  },
});

// redirect to bus route page
function viewBusRoute(routeId) {
  return {
    name: 'bus.route',
    params: {
      routeId: routeId,
    },
    query: {
      direction: 'outbound',
    }
  };
};
</script>
