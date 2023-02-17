<template>
  <q-page padding>
    <!-- skeleton -->
    <div v-if="isLoading" class="row justify-center">
      <Bus.RouteSkeleton class="col-5" />
    </div>

    <q-timeline v-else-if="hasBusRouteStops" layout="comfortable" color="secondary">
      <q-timeline-entry
          v-for="stop in busRouteStopsByLang"
          :key="stop.stop"
          :title="stop.name"
          icon="keyboard_double_arrow_down">
        <div class="row q-gutter-sm">
          <template v-if="stop.eta.length">
            <q-chip square 
                v-for="(eta, etaIdx) in stop.eta" 
                :key="eta" 
                :label="eta"
                :color="etaIdx === 0 ? 'secondary' : ''"
                :text-color="etaIdx === 0 ? 'white' : ''" />
          </template>
          <template v-else>
            <q-chip square label="No ETA" />
          </template>
        </div>
      </q-timeline-entry>
    </q-timeline>

    <!-- blank bus route stops -->
    <div v-else class="fit flex flex-center">
      <q-chip square 
          icon="warning"
          label="No bus route stops found."
          color="transparent"
          text-color="primary" />
    </div>

    <!-- floating btn -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab 
          icon="swap_vert" 
          color="accent" 
          @click="onDirectionReverse" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Bus } from 'src/components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';

const router = useRouter();
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

// variable to store bus route stops
const busRouteStops = ref([]);
// computed bus route stops by language
const busRouteStopsByLang = computed(() => busRouteStops.value
  .map((stop) => ({
    ...stop,
    name: stop[props.lang],
  }))
);
// non-empty bus route stops flag
const hasBusRouteStops = computed(() => busRouteStops.value.length > 0);

// fetch bus routes
function fetchBusRoute(companyId, routeId, direction) {
  fetch(getBusRoute, { 
    companyId, routeId, direction 
  }, {
    config: {
      renderLoadingSpinner: false,
    },
    onSuccess(route) {
      busRouteStops.value = route.slice();
    },
  });
}

// reverse the direction
function onDirectionReverse() {
  const direction = props.direction === 'outbound' ? 'inbound' : 'outbound';
  router.push({
    name: 'bus.route',
    params: {
      companyId: props.companyId,
      routeId: props.routeId,
    },
    query: {
      direction,
    }
  });
}

// fetch bus routes when routeId or direction changes
watchEffect(() => {
  fetchBusRoute(props.companyId, props.routeId, props.direction);
});
</script>
