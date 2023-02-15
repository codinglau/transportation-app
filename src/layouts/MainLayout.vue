<template>
  <q-layout view="lHh Lpr lFf">
    <!-- header -->
    <q-header class="gt-sm">
      <q-toolbar>
        <q-btn flat dense round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-center">
          {{ t(data.title) }}
        </q-toolbar-title>
        <q-btn flat round
            icon="fa-solid fa-rotate"
            aria-label="Refresh Page">
          <q-tooltip>刷新資料</q-tooltip>
        </q-btn>
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

    <!-- drawer -->
    <Layout.DesktopDrawer 
        v-model="leftDrawerOpen"
        :companies="data.busCompany.options"
        :routes="busRoutes"
        :isLoading="data.busRoute.isLoading"
        class="gt-sm" />

    <!-- main panel -->
    <q-page-container>
      <router-view @data-bus-routes="getBusRoutes" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMeta, useQuasar } from 'quasar';
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bus, Layout } from 'components';
import { useOption } from 'src/constants';

// use quasar
const $q = useQuasar();
// use i18n
const { t } = useI18n();
// use global option
const option = useOption();

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
    // value: 'nwfb',
    options: option.busCompanies.map((bc) => ({
      ...bc,
      to: {
        name: 'bus.routes',
        params: {
          companyId: bc.value,
        },
      },
    })),
  },
  footer: {

  },
  busRoute: {
    value: '',
    isLoading: false,
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
const busRoutes = computed(() => data.busRoute.options.map((r) => ({
  ...r,
  origin: r.origin[props.lang],
  destination: r.destination[props.lang],
})));

// get bus routes
function getBusRoutes(cxt) {
  for (const key in cxt) {
    data.busRoute[key] = cxt[key];
  }
}

// set meta
useMeta(() => ({
  title: t(data.title),
}));

// before mount
onBeforeMount(() => {
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
