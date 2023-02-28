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
          {{ t(title) }}
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
        class="gt-sm"
        v-model="leftDrawerOpen"
        :loading="loadingRouteList"
        :company-list="companyList"
        :route-list="routeListByLang" />

    <!-- main panel -->
    <q-page-container>
      <router-view 
          :route-list="routeListByLang" 
          :loading="loadingRouteList" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMeta, useQuasar } from 'quasar';
import { ref, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Layout } from 'components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';
import { useOption } from 'src/constants';

// #region Setup
// use q object
const $q = useQuasar();
// use route
const route = useRoute();
// use i18n
const { t } = useI18n();
// use global option
const option = useOption();
// use fetch 
const { 
  fetch, 
  loadingRouteList 
} = useFetch(['loadingRouteList']);
// use bus service
const { getBusRoutes } = useBusService();
// #endregion

// define props
const props = defineProps({
  lang: {
    type: String,
    default: 'tc',  // default to traditional chinese
    required: true,
  },
  companyId: {
    type: String,
    default: 'kmb', // default to kmb
  },
});

// #region Drawer
// left drawer open state
const leftDrawerOpen = ref(false);

// toggle left drawer
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
// #endregion

// #region Bus Route List
const routeList = ref([]);

// computed bus routes by language
const routeListByLang = computed(
  () => routeList.value.map((r) => ({
    ...r,
    origin: r.origin[props.lang],
    destination: r.destination[props.lang],
  }))
);

// fetch bus route list
function fetchRouteList(companyId) {
  fetch(getBusRoutes, { companyId }, {
    config: {
      loadingScope: 'loadingRouteList',
    },
    onSuccess(data) {
      routeList.value = data.slice();
    },
  });
}
// #endregion

// #region Company List
const companyList = option.busCompanies.map((c) => ({
  ...c,
  to: {
    name: 'bus.routes',
    params: {
      companyId: c.value,
    },
  }
}));
// #endregion

// #region Meta
const title = 'layout.header.title';
useMeta(() => ({
  title: t(title),
}));
// #endregion

// reset bus route list when company id changes or screen size changes
watchEffect(() => {
  if ($q.screen.gt.sm) {
    // when screen becomes greater than sm, 
    // i.e. drawer reappears and bus route list would be shown on the left drawer
    // and current page is not the bus route list page
    if (route.name !== 'bus.routes') {
      // reset bus route list
      fetchRouteList(props.companyId);
    } else {
      // when current page is the bus route list page
      // wait for the company id to be updated before fetching bus routes
      // i.e. wait for q-route-tab to switch to the correct tab first
      setTimeout(() => {
        fetchRouteList(props.companyId);
      }, 200);
    }
  } else {
    // when screen is less than sm
    // i.e. drawer disappears and bus route list would be shown on the main panel
    if (route.name === 'bus.routes') {
      // reset bus route list
      fetchRouteList(props.companyId);
    }
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
