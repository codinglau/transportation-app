<template>
  <q-list separator>
    <q-slide-item 
        v-for="route in options"
        :key="route.id">
      <q-item clickable 
          active-class="bg-grey-3"
          :to="viewBusRoute(route.id)">
        <q-item-section avatar>
          <q-card-section 
            class="column items-center overflow-hidden q-pa-xs">
            <q-chip square
                :label="t(route.company)" 
                class="q-mt-none"
                size="sm" />
            <q-btn unelevated round
                color="primary"
                text-color="white"
                size="md"
                :label="route.id" />
          </q-card-section>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ route.origin }}
          </q-item-label>
          <q-item-label class="text-center">
            <q-icon name="swap_horiz" color="primary" size="sm" />
          </q-item-label>
          <q-item-label class="text-right">
            {{ route.destination }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-slide-item>
  </q-list>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

// use i18n
const { t } = useI18n();

defineProps({
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
});

// redirect to bus route page
function viewBusRoute(routeId) {
  return {
    name: 'bus.routeStopList',
    params: { routeId: routeId },
    query: { direction: 'outbound' }
  };
};
</script>
