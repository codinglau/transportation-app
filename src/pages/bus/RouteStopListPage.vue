<template>
  <q-page padding class="flex flex-center">
    <!-- skeleton -->
    <Bus.RouteStopListSkeleton 
        v-if="loadingBusRouteStopList"
        class="col" />

    <div v-else-if="!isEmptyBusRouteStopList" class="col">
      <q-stepper animated bordered flat header-nav vertical
          v-model="currentStop"
          ref="stepper"
          active-color="secondary"
          active-icon="visibility"
          class="q-pt-none overflow-hidden"
          inactive-color="primary"
          @update:model-value="fetchBusStopEtaList">
        <q-step
            v-for="stop in busRouteStopListByLang"
            :key="stop.stop"
            :name="stop.stop"
            :title="stop.name"
            icon="keyboard_double_arrow_down">
          <q-spinner-comment
              v-if="loadingBusStopEtaList"
              color="secondary"
              size="3em" />
          <div v-else-if="stop.etaList.length" class="row q-gutter-sm">
            <q-chip square 
                v-for="eta in stop.etaList" 
                :key="eta" 
                :label="eta"
                color="secondary"
                text-color="white" />
          </div>
          <q-chip square v-else
              icon="warning" 
              label="No bus ETA available." />
        </q-step>
        <template v-slot:message>
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>
              <q-icon name="directions_bus" color="white" />
              {{ header.origin }}
              <q-icon name="keyboard_double_arrow_right" color="white" />
              {{ header.destination }}
            </q-toolbar-title>
          </q-toolbar>
        </template>
      </q-stepper>
    </div>

    <!-- empty bus route stop list -->
    <div v-else class="fit flex flex-center">
      <q-chip square 
          icon="warning"
          label="No bus route stops found."
          color="transparent"
          text-color="primary" />
    </div>

    <!-- floating btns -->
    <template v-if="!loadingBusRouteStopList && !isEmptyBusRouteStopList">
      <q-page-sticky
          v-if="currentStop" 
          position="bottom-right" 
          :offset="[18, 88]">
        <q-btn fab 
            icon="refresh" 
            color="secondary" 
            :label="refreshBusStopEtaLabel"
            :loading="loadingBusStopEtaList"
            @click="fetchBusStopEtaList" />
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab 
            icon="swap_vert"
            color="secondary" 
            :label="reverseDirectionLabel"
            @click="reverseDirections" />
      </q-page-sticky>
    </template>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, ref, watchEffect, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { Bus } from 'src/components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';

// use q object
const $q = useQuasar();
// use router
const router = useRouter();
// use fetch
const { 
  fetch, 
  loadingBusRouteStopList,
  loadingBusStopEtaList, 
} = useFetch(['loadingBusRouteStopList', 'loadingBusStopEtaList']);
// use bus service
const { getBusRouteStopList, getBusStopEtaList } = useBusService();

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

// #region Bus Route Stop List 
// variable to store bus route stops
const busRouteStopList = ref([]);

// computed bus route stops by language
const busRouteStopListByLang = computed(
  () => busRouteStopList.value.map((stop) => ({
    ...stop,
    name: stop[props.lang],
  }))
);

// get origin and destination to display in header
const header = computed(() => {
  const result = {
    origin: '',
    destination: '',
  };

  if (busRouteStopList.value.length > 0) {
    result.origin = busRouteStopListByLang.value[0].name;
    result.destination = busRouteStopListByLang.value[busRouteStopList.value.length - 1].name;
  }

  return result;
});

// empty bus route stop list flag
const isEmptyBusRouteStopList = computed(() => busRouteStopList.value.length === 0);

// toggle reverse direction button label
const reverseDirectionLabel = computed(() => (
  $q.screen.gt.sm ? '切換方向' : ''
));

// fetch bus route stops
function fetchBusRoute(companyId, routeId, direction) {
  fetch(getBusRouteStopList, { 
    companyId, routeId, direction 
  }, {
    config: {
      loadingScope: 'loadingBusRouteStopList',
    },
    onSuccess(route) {
      busRouteStopList.value = route.slice();
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
// #endregion

// #region Route Stop ETA
// timer to refresh bus stop eta
let etaTimer = null;
// current stop
const currentStop = ref(null);

// fetch bus stop eta
function fetchBusStopEtaList() {
  fetch(getBusStopEtaList, { 
    companyId: props.companyId, 
    routeId: props.routeId, 
    stopId: currentStop.value, 
    direction: props.direction,
  }, {
    config: {
      loadingScope: 'loadingBusStopEtaList',
    },
    onSuccess(response) {
      const stop = busRouteStopList.value
        .find((stop) => stop.stop === currentStop.value);
      stop.etaList = response.slice();

      // initiate refresh bus stop eta timer
      refreshBusStopEta();
    },
  });
}

// refresh bus stop eta button label
const refreshBusStopEtaLabel = computed(() => (
  $q.screen.gt.sm ? '刷新到站時間' : ''
));

// refresh bus stop eta every 30 seconds
function refreshBusStopEta() {
  if (etaTimer) {
    clearInterval(etaTimer);
  }

  etaTimer = setInterval(() => {
    if (currentStop.value) {
      fetchBusStopEtaList();
    }
  }, 30000);
}
// #endregion

// fetch bus routes when routeId or direction changes
watchEffect(() => {
  fetchBusRoute(props.companyId, props.routeId, props.direction);
});

// clear timer when component unmounts
onBeforeUnmount(() => {
  if (etaTimer) {
    clearInterval(etaTimer);
  }
});
</script>
