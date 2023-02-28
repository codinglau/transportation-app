<template>
  <q-page padding class="row justify-center">
    <!-- skeleton -->
    <q-card flat bordered v-if="loadingBusRoute" class="col-12 col-md-8">
      <Bus.RouteSkeleton />
    </q-card>

    <div v-else-if="hasBusRouteStops" class="col-12 col-md-8">
      <q-stepper animated flat header-nav vertical bordered
          v-model="currentStop"
          ref="stepper"
          active-color="info"
          active-icon="visibility"
          inactive-color="primary"
          @update:model-value="fetchBusStopEta">
        <q-step
            v-for="stop in busRouteStopsByLang"
            :key="stop.stop"
            :name="stop.stop"
            :title="stop.name"
            icon="keyboard_double_arrow_down">
          For each ad campaign that you create, you can control how much you're willing to
          spend on clicks and conversions, which networks and geographical locations you want
          your ads to show on, and more.
        </q-step>
      </q-stepper>
    </div>

    <!-- <q-timeline 
        v-else-if="hasBusRouteStops" 
        layout="dense" 
        color="secondary">
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
    </q-timeline> -->

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
          @click="reverseDirections" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Bus } from 'src/components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';

// use router
const router = useRouter();
// use fetch
const { 
  fetch, 
  busRoute: loadingBusRoute,
  busStopEta: loadingBusStopEta, 
} = useFetch(['busRoute', 'busStopEta']);
// use bus service
const { getBusRoute, getBusStopEta } = useBusService();

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

/**
 * Handle bus route stops
 */

// current stop
const currentStop = ref(null);

// variable to store bus route stops
const busRouteStops = ref([]);

// computed bus route stops by language
const busRouteStopsByLang = computed(
  () => busRouteStops.value.map((stop) => ({
    ...stop,
    name: stop[props.lang],
  }))
);

// non-empty bus route stops flag
const hasBusRouteStops = computed(() => busRouteStops.value.length > 0);

// fetch bus route stops
function fetchBusRoute(companyId, routeId, direction) {
  fetch(getBusRoute, { 
    companyId, routeId, direction 
  }, {
    config: {
      loadingScope: 'busRoute',
    },
    onSuccess(route) {
      busRouteStops.value = route.slice();
    },
  });
}

// reverse the direction
function reverseDirections() {
  const direction = (props.direction === 'outbound') ? 'inbound' : 'outbound';
  router.push({
    name: 'bus.route',
    params: {
      companyId: props.companyId,
      routeId: props.routeId,
    },
    query: { direction },
  });
}

// fetch bus stop eta
function fetchBusStopEta(stopId) {
  fetch(getBusStopEta, { 
    companyId: props.companyId, 
    routeId: props.routeId, 
    stopId, 
  }, {
    config: {
      loadingScope: 'busStopEta',
    },
    // onSuccess(eta) {
    //   const stop = busRouteStops.value.find((stop) => stop.stop === stopId);
    //   stop.eta = eta;
    // },
  });
}

// fetch bus routes when routeId or direction changes
watchEffect(() => {
  fetchBusRoute(props.companyId, props.routeId, props.direction);
});
</script>
