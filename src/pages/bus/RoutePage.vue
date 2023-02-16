<template>
  <q-page padding>
    <q-timeline layout="loose" color="secondary">
      <q-timeline-entry
          v-for="(stop, idx) in busRouteStopsByLang"
          :key="stop.stop"
          :title="stop.name"
          :side="idx % 2 === 0 ? 'left' : 'right'"
          icon="keyboard_double_arrow_down">
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script setup>
import { computed, ref, onBeforeMount } from 'vue';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';

const { fetch, isLoading } = useFetch();
const { getBusRoute } = useBusService();

// define props
const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  routeId: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
});

// define bus route stops
const busRouteStops = ref([]);
// computed bus route stops by language
const busRouteStopsByLang = computed(() => busRouteStops.value
  .map((stop) => ({
    ...stop,
    name: stop[props.lang],
  }))
);

// fetch bus routes
function fetchBusRoute(companyId, routeId, direction) {
  // emit loading state
  // emit('data-bus-routes', { isLoading: true });
  
  fetch(getBusRoute, { 
      companyId, routeId, direction 
    }, {
      // config: {
      //   renderLoadingSpinner: false,
      // },
      onSuccess(route) {
        busRouteStops.value = route.slice();
      },
    }
  );
}

// before mount
onBeforeMount(() => {
  fetchBusRoute(props.companyId, props.routeId, props.direction);
});
</script>
