<template>
  <q-page class="row items-stretch">
    <q-skeleton v-if="loadingBusRoute" type="QToolbar" />
    <div v-else class="header col-12">
      <q-toolbar class="bg-primary text-white text-center">
        <q-toolbar-title>
          <q-chip :label="busRoute.routeId" color="white" />
          {{ busRoute.origin[lang] }}
          <q-icon name="multiple_stop" />
          {{ busRoute.destination[lang] }}
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="no-padding bg-primary text-white">
        <q-tabs 
            v-model="direction.value" 
            class="full-width"
            align="justify">
          <q-tab
              v-for="d in direction.options"
              :key="d.value"
              :name="d.value"
              :label="t(d.label)" />
        </q-tabs>
      </q-toolbar>
    </div>
    
    <!-- skeleton -->
    <Bus.RouteStopListSkeleton v-if="loadingBusRouteStopList" class="col-12" />
    <!-- bus route stop lists -->
    <q-tab-panels v-else swipeable keep-alive animated 
        v-model="direction.value"
        class="col-12">
      <q-tab-panel 
          v-for="d in direction.options"
          :key="d.value"
          :name="d.value"
          :disable="d.disable">
        <q-list>
          <q-expansion-item popup
              v-for="s in busRouteStopList[d.value]"
              :key="s.stop"
              icon="keyboard_double_arrow_down"
              :label="s[lang]"
              group="inbound"
              expand-icon="zoom_out_map"
              expanded-icon="zoom_in_map"
              @show="() => fetchBusStopEtaList(s.stop, d.value)">
            <q-card>
              <q-card-section class="text-center">
                <q-spinner-comment
                    v-if="loadingBusStopEtaList"
                    color="secondary"
                    size="3em" />
                <div 
                    v-else-if="s.etaList && s.etaList.length" 
                    class="row q-gutter-sm justify-center">
                  <q-chip square 
                      v-for="eta in s.etaList" 
                      :key="eta" 
                      :label="eta"
                      color="secondary"
                      text-color="white" />
                </div>
                <q-chip square v-else
                    icon="warning" 
                    color="transparent"
                    text-color="secondary"
                    label="No bus ETA available." />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>

    <!-- floating btns -->
    <template v-if="!loadingBusRouteStopList">
      <q-page-sticky
          v-if="currentStop" 
          position="bottom-right" 
          :offset="[18, 88]">
        <q-btn fab dense
            icon="refresh" 
            color="secondary" 
            :label="refreshBusStopEtaLabel"
            :loading="loadingBusStopEtaList"
            @click="fetchBusStopEtaList" />
      </q-page-sticky>
    </template>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, reactive, ref, watch, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Bus } from 'src/components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';

// use q object
const $q = useQuasar();
// use route
const route = useRoute();
// use router
const router = useRouter();
// use i18n
const { t } = useI18n();
// use fetch
const { 
  fetch, 
  loadingBusRoute,
  loadingBusRouteStopList,
  loadingBusStopEtaList, 
} = useFetch([
  'loadingBusRoute',
  'loadingBusRouteStopList', 
  'loadingBusStopEtaList',
]);
// use bus service
const service = useBusService();

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
    default: 'outbound',
    validate: (value) => ['OUTBOUND', 'INBOUND'].includes(value.toUpperCase()),
  },
});

// #region Bus Route informaton
// get bus route information
const busRoute = reactive({
  routeId: '',
  origin: {
    en: '',
    tc: '',
  },
  destination: {
    en: '',
    tc: '',
  },
});

// get bus route information
async function fetchBusRoute() {
  fetch(service.getBusRoute, {
    companyId: props.companyId, 
    routeId: props.routeId
  }, {
    config: {
      loadingScope: 'loadingBusRoute',
    },
    onSuccess(response) {
      busRoute.routeId = response.route;
      busRoute.origin.en = response.orig_en;
      busRoute.origin.tc = response.orig_tc;
      busRoute.destination.en = response.dest_en;
      busRoute.destination.tc = response.dest_tc;
    },
  });
}
// #endregion

// #region Bus Route Stop List
// direction options
const direction = reactive({
  value: 'outbound',
  options: [
    { 
      value: 'outbound', 
      label: 'page.routeStopList.header.outbound', 
      disable: true 
    },
    { 
      value: 'inbound', 
      label: 'page.routeStopList.header.inbound', 
      disable: true 
    },
  ],
  filteredOptions: [],
}); 

// bus route stop list
const busRouteStopList = reactive({
  inbound: [],
  outbound: [],
});

// inbound bus route stop list
const inboundBusRouteStopList = computed(
  () => busRouteStopList.inbound.map((s) => ({
    ...s,
    name: s[props.lang],
  }))
);

// empty inbound bus route stop list flag
const isEmptyInboundBusRouteStopList = computed(
  () => busRouteStopList.inbound.length === 0);

// outbound bus route stop list
const outboundBusRouteStopList = computed(
  () => busRouteStopList.outbound.map((s) => ({
    ...s,
    name: s[props.lang],
  }))
);

// empty outbound bus route stop list flag
const isEmptyOutboundBusRouteStopList = computed(
  () => busRouteStopList.outbound.length === 0);

// fetch bus route stops
function fetchBusRouteStopList(companyId, routeId) {
  // clear timer
  clearTimer();
  // clear current stop
  currentStop.value = null;

  fetch(service.getBusRouteStopList, { 
    companyId, routeId
  }, {
    config: {
      loadingScope: 'loadingBusRouteStopList',
    },
    onSuccess(response) {
      for (const key in response) {
        if (response[key].length > 0) {
          direction.options.find((o) => o.value === key).disable = false;
        } else {
          direction.options.find((o) => o.value === key).disable = true;
        }
        busRouteStopList[key] = response[key];
      }
    },
  });
}
// #endregion

// #region Route Stop ETA
// timer to refresh bus stop eta
let etaTimer = null;
// current stop
const currentStop = ref(null);

// fetch bus stop eta
function fetchBusStopEtaList(stopId, direction) {
  // clear timer
  clearTimer();

  fetch(service.getBusStopEtaList, { 
    companyId: props.companyId, 
    routeId: props.routeId, 
    stopId, 
    direction,
  }, {
    config: {
      loadingScope: 'loadingBusStopEtaList',
    },
    onSuccess(response) {
      const stop = busRouteStopList[direction]
        .find((s) => s.stop === stopId);

      if (!stop) return;
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
  if (etaTimer) clearInterval(etaTimer);

  etaTimer = setInterval(() => {
    if (currentStop.value) fetchBusStopEtaList();
  }, 30000);
}
// #endregion

// clear timer
function clearTimer() {
  if (etaTimer) {
    clearInterval(etaTimer);
  }
}

// fetch bus routes when routeId changes
watch(() => props.routeId, (routeId) => {
  fetchBusRoute();
  fetchBusRouteStopList(props.companyId, routeId);
});

// watch direction changes
watch(() => props.direction, (newVal) => {
  if (newVal) {
    if (newVal.toUpperCase() === 'OUTBOUND') {
      direction.value = 0;
    } else if (newVal.toUpperCase() === 'INBOUND') {
      direction.value = 1;
    }
  }
});

// fetch bus route information before mounting
onBeforeMount(() => {
  fetchBusRoute();
  fetchBusRouteStopList(props.companyId, props.routeId);
});

// clear timer before unmounting
onBeforeUnmount(() => {
  clearTimer();
});
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 50px;
  z-index: 1;

  @media screen and (max-width: $breakpoint-sm-max) {
    top: 0;
  }
}

// .route-list {
//   max-height: calc(100vh - 150px);
//   overflow: scroll;

//   @media screen and (max-width: $breakpoint-sm-max) {
//     max-height: calc(100vh - 100px);
//   }
// }
</style>
