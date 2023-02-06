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
        
        <q-tabs class="full-width">
          <q-btn-dropdown auto-close stretch flat label="巴士">
            <q-list>
              <q-item clickable @click="tab = 'movies'">
                <q-item-section>Movies</q-item-section>
              </q-item>

              <q-item clickable @click="tab = 'photos'">
                <q-item-section>Photos</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-route-tab :label="t('layout.footer.settings')" icon="settings" />
        </q-tabs>
      </q-toolbar>
    </q-footer>

    <!-- drawer -->
    <Layout.DesktopDrawer 
        v-model="leftDrawerOpen"
        :companies="data.tab.options"
        :routes="busRoutes"
        :isLoading="isLoading"
        class="gt-sm" />

    <!-- main panel -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMeta } from 'quasar';
import { ref, reactive, computed, onBeforeMount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bus, Layout } from 'components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';
import { useOption } from 'src/constants';

// use i18n
const { t } = useI18n();
// use composables
const { fetch, isLoading } = useFetch();
// use bus service
const { getBusRoutes } = useBusService();
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
  tab: {
    // value: 'nwfb',
    options: option.busCompanies.map((bc) => ({
      ...bc,
      to: {
        name: 'bus.index',
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
    options: [],
  }
});

/** handle drawer */
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

/** handle bus data */
// fetch bus routes when company id changed
watch(() => props.companyId, (newCId) => {
  fetchBusRoutes(newCId);
});

// fetch bus routes
const busRoutes = computed(() => data.busRoute.options.map((r) => ({
  ...r,
  origin: r.origin[props.lang],
  destination: r.destination[props.lang],
})));

function fetchBusRoutes(companyId) {
  fetch(() => ({
    action: getBusRoutes,
    request: companyId,
    config: {
      renderLoadingSpinner: false,
    },
  }),
  (routes) => {
    data.busRoute.options = routes.slice();
  });
}

// set meta
useMeta(() => ({
  title: data.title,
}));

// before mount
onBeforeMount(() => {
  fetchBusRoutes(props.companyId);
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
