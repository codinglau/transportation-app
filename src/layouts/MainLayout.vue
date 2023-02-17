<template>
  <q-layout view="lHh Lpr lFf">
    <!-- header -->
    <q-header class="gt-sm">
      <q-toolbar>
        <q-btn flat dense round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer" />
        <q-toolbar-title>
          {{ t(data.title) }}
        </q-toolbar-title>
        <!-- <q-btn flat round
            icon="fa-solid fa-rotate"
            aria-label="Refresh Page">
          <q-tooltip>刷新資料</q-tooltip>
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <!-- footer -->
    <q-footer bordered class="lt-md">
      <q-toolbar class="q-pr-none">
        <q-btn flat dense round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer" />
        
        <q-tabs class="full-width" align="justify">
          <q-tab icon="directions_bus" />
          <q-tab icon="search" />
          <q-tab icon="refresh" />
          <q-tab icon="settings" />
        </q-tabs>
      </q-toolbar>
    </q-footer>

    <!-- desktop drawer -->
    <Layout.DesktopDrawer 
        v-model="leftDrawerOpen"
        :companies="data.busCompany.options"
        :routes="busRoutes"
        :loading="isLoading"
        class="gt-sm" />

    <!-- main panel -->
    <q-page-container>
      <router-view :bus-routes="busRoutes" :loading="isLoading" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMeta, useQuasar } from 'quasar';
import { ref, reactive, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Layout } from 'components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';
import { useOption } from 'src/constants';

// use q object
const $q = useQuasar();
// use route
const route = useRoute();
// use i18n
const { t } = useI18n();
// use global option
const option = useOption();
// use fetch 
const { fetch, isLoading } = useFetch();
// use bus service
const { getBusRoutes } = useBusService();

// define props
const props = defineProps({
  lang: {
    type: String,
    default: 'tc',  // default to traditional chinese
    required: true,
  },
  companyId: {
    type: String,
  },
});

// data
const data = reactive({
  title: 'layout.header.title',
  busCompany: {
    options: option.busCompanies.map((bc) => ({
      ...bc,
      to: {
        name: 'bus.routes',
        params: {
          companyId: bc.value,
        },
      }
    })),
  },
  footer: {

  },
  busRoute: {
    value: '',
    options: [],
  }
});

/** handle drawer */
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

/** handle bus data */
// computed bus routes
const busRoutes = computed(() => data.busRoute.options
  .map((r) => ({
    ...r,
    origin: r.origin[props.lang],
    destination: r.destination[props.lang],
  }))
);

// fetch bus routes
function fetchBusRoutes(companyId) {
  fetch(getBusRoutes, { companyId }, {
    config: {
      renderLoadingSpinner: false,
    },
    onSuccess(routes) {
      data.busRoute.options = routes.slice();
    },
  });
}

// set meta
useMeta(() => ({
  title: t(data.title),
}));

// fetch bus routes when company id changes and screen is greater than sm
watchEffect(() => {
  if ($q.screen.gt.sm || route.name !== 'bus.routes') {
    // wait for the company id to be updated before fetching bus routes
    fetchBusRoutes(props.companyId);
  } else if (route.name === 'bus.routes') {
    // fetch bus routes when company id changes
    setTimeout(() => {
      fetchBusRoutes(props.companyId);
    }, 100);
  }
});
</script>

<style scoped lang="scss">
:deep(.drawer) {
  display: flex;
  flex-direction: column;  
  
  .drawer__content {
    flex: 1 1 auto; // fill remaining space
  }
}
</style>
