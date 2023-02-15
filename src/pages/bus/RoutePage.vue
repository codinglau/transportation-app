<template>
  <q-page padding class="flex flex-center">
    {{ busRouteStops }}
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useOption } from 'src/constants';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';

const { fetch, isLoading } = useFetch();
const { getBusRoute } = useBusService();

// define props
const props = defineProps({
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

// fetch bus routes
function fetchBusRoute(companyId, routeId, direction) {
  // emit loading state
  // emit('data-bus-routes', { isLoading: true });
  
  fetch(getBusRoute, { 
      companyId, routeId, direction 
    }, {
      config: {
        renderLoadingSpinner: false,
      },
      onSuccess(route) {
        busRouteStops.value = route.slice();
      },
      onFinally() {
        // emit bus routes and loading state
        // emit('data-bus-routes', {
        //   options: data.busRoute.options.slice(),
        //   isLoading: false,
        // });
      }
    }
  );
}

// before mount
onBeforeMount(() => {
  fetchBusRoute(props.companyId, props.routeId, props.direction);
});
</script>
