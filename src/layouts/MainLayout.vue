<template>
  <q-layout view="lHh Lpr lFf">
    <!-- header -->
    <q-header class="gt-sm">
      <q-toolbar>
        <q-btn flat dense round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-center">{{ data.title }}</q-toolbar-title>
        <!-- <q-btn flat dense
            v-if="renderReturnHomeBtn"
            icon="fa-solid fa-house"
            aria-label="Home"
            :to="{ name: 'home' }">
          <q-tooltip>回首頁</q-tooltip>
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
        <!-- <Bus.CompanyTabs class="full-width" align="justify"
            :options="data.tab.options" /> -->
      </q-toolbar>
    </q-footer>

    <!-- drawer -->
    <Layout.DesktopDrawer 
        v-model="leftDrawerOpen"
        :companies="data.tab.options"
        :routes="data.busRoute.options"
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
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Bus, Layout } from 'components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';
import { useOption } from 'src/constants';

// use route
const route = useRoute();
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
  renderDrawer: {
    type: Boolean,
    default: true,
  },
  renderReturnHomeBtn: {
    type: Boolean,
    default: true,
  },
});

// data
const data = reactive({
  title: '交通資訊 APP',
  tab: {
    // value: 'nwfb',
    options: option.busCompanies.map((bc) => ({
      ...bc,
      label: t(bc.label),
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

// computed properties


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
function fetchBusRoutes(companyId) {
  fetch(() => ({
    action: getBusRoutes,
    request: companyId,
    config: {
      renderLoadingSpinner: false,
    },
  }),
  (routes) => {
    data.busRoute.options = routes.map((r) => ({
      ...r,
      origin: r.origin[props.lang],
      destination: r.destination[props.lang],
    }));
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
